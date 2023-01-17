import { $, component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

type IMode = "Edit" | "Save";
type ITodo = {
  value: string;
  mode: IMode;
};
interface IStore {
  value: string;
  editedValue: string;
  todos: ITodo[];
}

export const handleAdd = (store: IStore) => {
  if (!store.value) {
    return;
  }
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
      editedValue: "",
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
            <div
              contentEditable="true"
              onInput$={(event: InputEvent) => {
                store.editedValue += event.data;
              }}
              onBlur$={() => {
                todo.value += store.editedValue;
                store.editedValue = "";
              }}
            >
              {todo.value}
            </div>
            <button onClick$={$(() => handleDelete(store, i))}>Delete</button>
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
