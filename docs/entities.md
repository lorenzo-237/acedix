```typescript
class Project {
  id: number;
  name: string;
  description: string;
  versions?: Version[];
  createdById: number;
  createdAt: Date;
  updatedById: number;
  updatedAt: Date;
}

class Version {
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

class Board {
  id: number;
  name: string;
  createdById: number;
  createdAt: Date;
  updatedById: number;
  updatedAt: Date;
}

class List {
  id: number;
  title: string;
  board_id: number;
  board?: Board;
  createdById: number;
  createdAt: Date;
  updatedById: number;
  updatedAt: Date;
}

class Card {
  id: number;
  title: string;
  description: string;
  list_id: number;
  position: number;
  createdById: number;
  createdAt: Date;
  updatedById: number;
  updatedAt: Date;
}

class User {
  id: number;
  username: string;
  password: string;
  email: string;
  role: 'USER' | 'MAINTAINER' | 'ADMIN';
}

```