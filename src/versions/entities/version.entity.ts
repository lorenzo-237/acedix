import { Project } from 'src/projects/entities/project.entity';

export class Version {
  id: number;
  number: string;
  description: string;
  project_id: number;
  project: Project;
}
