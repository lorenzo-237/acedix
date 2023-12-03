```typescript
class Board {
  id: string;
  name: string;
}

class List {
  id: string;
  title: string;
  board_id: string;
}

class Card {
  id: string;
  title: string;
  description: string;
  list_id: string;
  position: number;
}

class Project {
  id: string;
  name: string;
  description: string;
}

class Version {
  id: string;
  number: string;
  description: string;
  project_id: string;
}
```