import React from 'react';
import { Editor } from 'draft-js';
import { useNote } from '../';

interface NoteEditorProps {
  noteId: string
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ noteId }) => {
  const { editorState, handleChange } = useNote(noteId);

  return (
    <div className="p-4">
      {editorState &&
        <Editor
          editorState={editorState}
          onChange={handleChange}
        />
      }
    </div>
  );
};
