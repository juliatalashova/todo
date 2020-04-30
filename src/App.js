import React, {useState} from 'react'

const FILTER_ALL = 0
const FILTER_DONE = 1
const FILTER_ACTIVE = 2

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <li className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>

      <input type="checkbox" onChange ={() => completeTodo(todo.text)} checked={todo.isCompleted}/>
        {todo.text}
      <button onClick={() => removeTodo(todo.text)}>&#10006;</button>
    </li>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "Do First",
      isCompleted: false
    },
    {
      text: "Do Second",
      isCompleted: false
    },
    {
      text: "Do Third",
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = text => {
    setTodos(
      todos.map(todo => ({
        ...todo,
        isCompleted: todo.text ===text ? !todo.isCompleted : todo.isCompleted
      }))
    )
  };

  const removeTodo = text => {
    //const newTodos = [...todos];
    //newTodos.splice(index, 1);
    setTodos(todos.filter(todo => todo.text !== text));
  };

  return (
    <div className="app">
      <TodoForm addTodo={addTodo} />
      <List todos={todos} completeTodo={completeTodo} removeTodo={removeTodo}/>
    </div>
  );
}
function List({todos, completeTodo, removeTodo}) {
  let [filter, setFilter] = useState(FILTER_ALL);

  let filteredTodos = todos.filter(todo =>{
    switch (filter) {
        case FILTER_DONE:   return todo.isCompleted
        case FILTER_ACTIVE: return !todo.isCompleted
        default:            return true
      }
  })


  return <div>
    <ul className="todoList">
    {filteredTodos.map((todo, index) => (
        <Todo
          key={index}
          index={index}
          todo={todo}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
        />
      ))}
    </ul>
    <Filters filter={filter} setFilter={setFilter}/>
  </div>



}
function Filters({filter, setFilter}) {
  return <div>
    <p>
      Show:
      {" "}
      {filter == FILTER_ALL
        ? <a href="#all"><b>All</b></a>
        : <a href="#all" onClick={e => { e.preventDefault(); setFilter(FILTER_ALL) }}>All</a>}
      {", "}
      {filter == FILTER_ACTIVE
        ? <a href="#active"><b>Active</b></a>
        : <a href="#active" onClick={e => { e.preventDefault(); setFilter(FILTER_ACTIVE) }}>Active</a>}
      {", "}
      {filter == FILTER_DONE
        ? <a href="#done"><b>Done</b></a>
        : <a href="#done" onClick={e => { e.preventDefault(); setFilter(FILTER_DONE) }}>Done</a>}
    </p>
  </div>
}
export default App;






