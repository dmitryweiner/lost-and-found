export type Todo = {
  id: string;
  title: string;
  checked: boolean;
}

export type TodoList = Todo[];

export enum Filter {
  ALL = "Все",
  DONE = "Сделанные",
  NOT_DONE = "Не сделанные"
}

export type Context = {
  todos: TodoList,
  handleCheck: (id: string) => void;
  handleDelete: (id: string) => void;
}

export type Tag = {
  id: number;
  name: string;
}

export type Photo = {
  id: number;
  filename: string;
}
