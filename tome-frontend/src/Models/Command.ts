export interface Command {
  id: number;
  uid: number;
  title: string;
  body: string;
  tag: string;
}

export interface Tag {
  tag: string;
}

export interface Search {
  search: string;
}
