import React from 'react';
import { Editor } from 'draft-js';
import { Loading, Error } from '~platform';
import { useNote } from '../';

interface NoteEditorProps {
  noteId: string
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ noteId }) => {
  const { editorState, handleChange, isLoading, error } = useNote(noteId);

  if (error) {
    return <Error />;
  }

  return (
    <div className="p-4">
      {isLoading && <Loading />}
      {!isLoading && editorState &&
        <Editor
          editorState={editorState}
          onChange={handleChange}
        />
      }
    </div>
  );
};
