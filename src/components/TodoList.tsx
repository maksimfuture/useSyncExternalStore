import { useStore } from "../store/store";
import { todosStore } from "../store/todosStore";

import { FormEvent } from "react";

export const TodoList = () => {
  const [todos, setTodos] = useStore(todosStore);

  console.log("RENDER TODOS");

  const onRemoveTodo = (
    event: React.MouseEvent<HTMLUListElement, MouseEvent>,
  ) => {
    const idTodoToRemove = (event.target as HTMLElement).getAttribute(
      "data-id",
    );

    setTodos((todos) => {
      const newTodos = new Map(todos);
      if (idTodoToRemove) {
        newTodos.delete(idTodoToRemove);
      }

      return newTodos;
    });
  };

  const onAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (!data.get("title")) {
      return;
    }

    setTodos((prevTodos) => {
      const newTodos = new Map(prevTodos);

      const newTodo = {
        id: Math.floor(Math.random() * 1000).toString(),
        title: data.get("title") as string,
      };
      console.log(newTodos);
      newTodos.set(newTodo.id, newTodo);
      return newTodos;
    });
  };

  return (
    <section>
      <form onSubmit={onAddTodo}>
        <input name="title" />
        <button type="submit">ADD</button>
      </form>
      <ul onClick={onRemoveTodo}>
        {Array.from(todos.values()).map((todo) => {
          return (
            <li data-id={todo.id} key={todo.id}>
              {todo.title}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
