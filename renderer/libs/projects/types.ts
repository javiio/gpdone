export interface ProjectData {
  name: string
  color: string
  order?: number
  icon?: string
};

export interface Project extends ProjectData {
  id: string
};
