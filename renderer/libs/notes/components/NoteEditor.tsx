import React from 'react';
import { Editor } from 'draft-js';
import { Loading, Error } from '~platform';
import { useNote } from '../';

interface NoteEditorProps {
  noteId: string
  placeholder?: string
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ noteId, placeholder }) => {
  const { editorState, handleChange, isLoading, error } = useNote(noteId);

  if (error) {
    return <Error />;
  }

  return (
    <div className="p-4 min-h-[80px]">
      {isLoading && <Loading />}
      {!isLoading && editorState &&
        <Editor
          editorState={editorState}
          onChange={handleChange}
          placeholder={placeholder ?? 'Type here...'}
        />
      }
    </div>
  );
};
