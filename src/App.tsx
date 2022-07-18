import React, { DetailedHTMLProps, useCallback, useRef } from "react";
import { useTodos } from "./useTodos";
import "./App.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, selectTodos, addTodo, removeTodo } from "./store";

const Button: React.FunctionComponent<
  DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { title?: string }
> = ({ title, children, style, ...rest }) => (
  <button
    {...rest}
    style={{
      ...style,
      backgroundColor: "blue",
      color: "white",
      fontSize: "xx-large",
    }}
  >
    {title ?? children}
  </button>
);

const Header = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box: React.FunctionComponent<{ children: string }> = ({ children }) => {
  return <div>{children}</div>;
};
function UL<T>({
  items,
  render,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  items: T[];
  render: (item: T) => React.ReactNode;
}) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{render(item)}</li>
      ))}
    </ul>
  );
}

function App() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  // const { todos, addTodo, removeTodo } = useTodos([]);
  const newTodo = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodo.current) {
      dispatch(addTodo(newTodo.current.value));
      newTodo.current.value = "";
    }
  }, [dispatch]);

  return (
    <div>
      <Header title='introduction' />
      <Box>Hello There</Box>

      <Header title='Todos' />
      <UL
        items={todos}
        render={todo => (
          <>
            {todo.text}
            <Button onClick={() => dispatch(removeTodo(todo.id))}>
              Remove
            </Button>
          </>
        )}
      />

      <div>
        <input type='text' ref={newTodo} />
        <Button onClick={onAddTodo}>Add Todo</Button>
      </div>
    </div>
  );
}
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default AppWrapper;
