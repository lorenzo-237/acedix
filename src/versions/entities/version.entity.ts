import { Project } from 'src/projects/entities/project.entity';

export class Version {
  id: number;
  name: string;
  description: string;
  project_id: number;
  project?: Project;
  createdById: number;
  createdAt: Date;
  updatedById: number;
  updatedAt: Date;
}
