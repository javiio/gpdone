export interface ProjectData {
  name: string
  order?: number
  color: string
};

export interface Project extends ProjectData {
  id: string
};
