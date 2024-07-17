import { SetStateAction, useSyncExternalStore } from "react";

type Callback = () => void;

const isActionFunction = <T>(
  action: SetStateAction<T>,
): action is (last: T) => T => {
  return typeof action === "function";
};

interface Store<T> {
  getValue(): T;
  setValue(value: T): void;
  subscribe(callback: Callback): Callback;
}

const createStore = <T>(defaultValue: T): Store<T> => {
  let value = defaultValue;
  const listeners = new Set<Callback>();

  return {
    getValue: () => {
      return value;
    },
    setValue: (newValue: T) => {
      value = newValue;
      listeners.forEach((listener) => {
        listener();
      });
    },
    subscribe: (callback: Callback) => {
      listeners.add(callback);

      return () => {
        listeners.delete(callback);
      };
    },
  };
};

const useStore = <T>(
  store: Store<T>,
): [value: T, setValue: (action: SetStateAction<T>) => void] => {
  const value = useSyncExternalStore(store.subscribe, store.getValue);

  const setValue = (action: SetStateAction<T>) => {
    if (isActionFunction(action)) {
      store.setValue(action(store.getValue()));
    } else {
      setValue(action);
    }
  };

  return [value, setValue];
};

export { useStore, createStore };
