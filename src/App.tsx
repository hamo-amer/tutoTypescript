import React, {
  DetailedHTMLProps,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";

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

const useNumber = (initialeValue: number) => useState<number>(initialeValue);

type UseNumberValue = ReturnType<typeof useNumber>[0];
type UseNumberSetValue = ReturnType<typeof useNumber>[1];

const Incrementer: React.FunctionComponent<{
  value: UseNumberValue;
  setValue: UseNumberSetValue;
}> = ({ value, setValue }) => (
  <div>
    <Button onClick={() => setValue(value + 1)} title={`Add -${value}`} />
  </div>
);

const Header = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box: React.FunctionComponent<{ children: string }> = ({ children }) => {
  return <div>{children}</div>;
};

const List: React.FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void;
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item, i) => (
      <li key={i} onClick={() => onClick?.(item)}>
        {" "}
        {item}
      </li>
    ))}
  </ul>
);
interface Payload {
  text: string;
}
interface Todo {
  id: number;
  text: string;
  done: boolean;
}
type actionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

function App() {
  const onListClick = useCallback((item: string) => alert(item), []);

  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(res => setPayload(res));
  }, []);

  const [todos, dispatch] = useReducer((state: Todo[], action: actionType) => {
    switch (action.type) {
      case "ADD":
        return [...state, { id: state.length, text: action.text, done: false }];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
      default:
        return state;
    }
  }, []);
  const newTodo = useRef<HTMLInputElement>(null);

  const onAddTodo = () => {
    if (newTodo.current) {
      dispatch({ type: "ADD", text: newTodo.current.value });
      newTodo.current.value = "";
    }
  };
  const [value, setValue] = useState(0);

  return (
    <div>
      <Header title='introduction' />
      <Box>Hello There</Box>
      <List items={["one", "two", "three"]} onClick={onListClick} />
      <Box>{JSON.stringify(payload)}</Box>
      <Incrementer value={value} setValue={setValue} />
      <Header title='Todos' />
      {todos.map(todo => (
        <div key={todo.id}>
          {todo.text}
          <Button onClick={() => dispatch({ type: "REMOVE", id: todo.id })}>
            Remove
          </Button>
        </div>
      ))}
      <div>
        <input type='text' ref={newTodo} />
        <Button onClick={onAddTodo}>Add Todo</Button>
      </div>
    </div>
  );
}

export default App;
