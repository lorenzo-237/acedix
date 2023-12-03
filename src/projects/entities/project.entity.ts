import { Version } from 'src/versions/entities/version.entity';

export class Project {
  id: number;
  name: string;
  description: string;
  versions?: Version[];
}
