import type { RawDraftContentState } from 'draft-js';

export interface Note {
  id: string
  title: string
  body: RawDraftContentState
  createdAt: Date
  updatedAt: Date
  type: string
}
