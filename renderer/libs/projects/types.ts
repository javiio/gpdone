export interface ProjectData {
  name: string
  color: string
  order?: number
  icon?: string
  active?: boolean
};

export interface Project extends ProjectData {
  id: string
};
