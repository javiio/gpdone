import { useState, useEffect } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { debounce } from 'lodash';
import { useDocOnce, setDoc } from '~platform';
import type { Note } from '../';

export const useNote = (noteId: string) => {
  const [note, setNote] = useState<Note>();
  const [data, isLoading, error] = useDocOnce('notes', noteId);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (data?.data()) {
      setNote(data.data() as Note);
    }
  }, [data]);

  useEffect(() => {
    if (note?.body) {
      const contentState = convertFromRaw(note.body);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [note]);

  const saveContent = debounce(async (content) => {
    const data = {
      body: convertToRaw(content),
      updatedAt: new Date(),
    };
    await setDoc(data, 'notes', noteId);
  }, 5000);

  const handleChange = (state: EditorState) => {
    const contentState = state.getCurrentContent();
    setEditorState(state);
    saveContent(contentState);
  };

  return {
    note,
    editorState,
    handleChange,
    isLoading,
    error,
  };
};
