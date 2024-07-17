import { createStore } from "./store";

interface User {
  id: string;
  name: string;
}

const getDefaultUsers = (): User[] => {
  const defaultUsers = new Array(20).fill(0).map((_, index) => ({
    id: Math.floor(Math.random() * 1000).toString(),
    name: "name" + index,
  }));

  return defaultUsers;
};

const usersStore = createStore<User[]>(getDefaultUsers());

export { usersStore };
