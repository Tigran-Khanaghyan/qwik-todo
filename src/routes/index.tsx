import { $, component$, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

interface IStore {
  todos: string[];
  value: string;
}

export const handleAdd = (store: IStore) => {
  store.todos.push(store.value);
  store.value = "";
};

export const handleDelete = (store: IStore, index: number) => {
  store.todos = store.todos.filter((_e, i) => i !== index);
};

export const handleEdit = () => {
  
}

export const handleKeyPress = (event: KeyboardEventInit, store: IStore) => {
  console.log(event.key);
  if (event.key === "Enter") {
    handleAdd(store);
  }
};

export default component$(() => {
  const store = useStore(
    { value: "", todos: [] as string[] },
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
            <div>{todo}</div>
            <button type="submit" onClick$={$(() => handleDelete(store, i))}>
              Delete
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
