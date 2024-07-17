import { useStore } from "../store/store";
import { usersStore } from "../store/usersStore";

export const UsersList = () => {
  const [users, setUsers] = useStore(usersStore);

  console.log("RENDER USERS");

  const onRemoveUser = (
    event: React.MouseEvent<HTMLUListElement, MouseEvent>,
  ) => {
    const idTodoToRemove = (event.target as HTMLElement).getAttribute(
      "data-id",
    );

    if (!idTodoToRemove) {
      return;
    }

    setUsers((prevUsers) => {
      console.log(prevUsers.filter((user) => user.id !== idTodoToRemove));
      return prevUsers.filter((user) => user.id !== idTodoToRemove);
    });
  };

  return (
    <ul onClick={onRemoveUser}>
      {users.map((user) => (
        <li data-id={user.id} key={user.id}>
          {user.name}
        </li>
      ))}
    </ul>
  );
};
