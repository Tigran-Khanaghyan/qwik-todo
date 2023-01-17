import { $, component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

type IMode = "Edit" | "Save";
type ITodo = {
  value: string;
  mode: IMode;
};
interface IStore {
  value: string;
  todos: ITodo[];
}

export const handleAdd = (store: IStore) => {
  const todo = { value: store.value, mode: "Edit" };
  store.todos.push(todo as ITodo);
  store.value = "";
};

export const handleDelete = (store: IStore, index: number) => {
  store.todos = store.todos.filter((_e, i) => i !== index);
};

export const handleEdit = (todo: ITodo) => {
  if (todo.mode === "Edit") {
    todo.mode = "Save";
  } else {
    todo.mode = "Edit";
  }
};

export const handleKeyPress = (event: KeyboardEventInit, store: IStore) => {
  if (event.key === "Enter") {
    handleAdd(store);
  }
};

export default component$(() => {
  const store = useStore<IStore>(
    {
      value: "",
      todos: [],
    },
    { recursive: true }
  );

  return (
    <div>
      <input
        value={store.value}
        onInput$={(event) =>
          (store.value = (event.target as HTMLInputElement).value)
        }
        onKeyPress$={$((event: KeyboardEventInit) =>
          handleKeyPress(event, store)
        )}
      ></input>
      <button onClick$={$(() => handleAdd(store))}>ADD</button>
      {store.todos.map((todo, i) => {
        return (
          <>
            {todo.mode === "Edit" ? (
              <div>{todo.value}</div>
            ) : (
              <div>
                <input
                  value={todo.value}
                  onInput$={(event) =>
                    (todo.value = (event.target as HTMLInputElement).value)
                  }
                  onKeyPress$={$((event: KeyboardEventInit) => {
                    if (event.key === "Enter") {
                      handleEdit(todo);
                    }
                  })}
                ></input>
              </div>
            )}
            <button type="submit" onClick$={$(() => handleDelete(store, i))}>
              Delete
            </button>
            <button type="submit" onClick$={$(() => handleEdit(todo))}>
              {todo.mode}
            </button>
          </>
        );
      })}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
