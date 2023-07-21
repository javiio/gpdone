import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { type EditorState } from 'lexical';
import { useDocOnce, setDoc } from '~platform';
import type { Note } from '../';

const EMPTY_CONTENT =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
export const useNote = (noteId: string) => {
  const [note, setNote] = useState<Note>();
  const [data, isLoading, error] = useDocOnce('notes', noteId);
  const [editorState, setEditorState] = useState<string>();

  useEffect(() => {
    if (data?.data()) {
      setNote(data.data() as Note);
    } else {
      setNote(undefined);
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading && note) {
      setEditorState(note.body ?? EMPTY_CONTENT);
    }
  }, [note, isLoading]);

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      saveContent(JSON.stringify(editorState));
    });
  };

  const saveContent = debounce(async (body) => {
    const data = {
      body,
      updatedAt: new Date(),
    };
    await setDoc(data, 'notes', noteId);
  }, 1000);

  return {
    note,
    editorState,
    handleChange,
    isLoading,
    error,
  };
};
