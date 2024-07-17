import { createStore } from "./store";

interface Todo {
  id: string;
  title: string;
}

const getDefaultTodos = () => {
  const defaultTodos = new Map();

  for (let i = 0; i <= 10; i++) {
    const id = Math.floor(Math.random() * 1000).toString();

    const todo: Todo = {
      id,
      title: "Title " + id,
    };

    defaultTodos.set(todo.id, todo);
  }

  return defaultTodos;
};

const todosStore = createStore<Map<Todo["id"], Todo>>(getDefaultTodos());

export { todosStore };
