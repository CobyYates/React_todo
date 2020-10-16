import React, { useState, useEffect } from "react";
import "./App.css";
import { TextField, Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ToDo from "./ToDo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  // when the app loads, fetch data from the db and put into todos
  useEffect(() => {
    db.collection("todos")
      .orderBy("complete", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo, complete: doc.data().complete, type: doc.data().type }))
        );
      });
  }, []);
  const [input, setInput] = useState("");
  const [type, setType] = useState("");
  const addTodo = (event) => {
    // Prevents the form from refreshing the page
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      complete: false,
      type: type
    });
    // This will add the todo item to the db when the add btn is clicked
    setTodos([...todos, input]);
    setInput("");
    setType("")
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div className="App">
      <div className="overlay">
        <h1>The simple TODO app</h1>
        <h2>Built in React & Material-UI</h2>

        <form onSubmit={addTodo} className="app_inputs">
          <TextField
            id="todo"
            autoFocus
            label="ToDo Item..."
            variant="filled"
            value={input}
            margin="dense"
            onChange={(event) => setInput(event.target.value)}
          />
          <Select
            value={type}
            variant="filled"
            margin="dense"
            className="app_type"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Personal"}>Personal</MenuItem>
            <MenuItem value={"Business"}>Business</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
          <Button
            type="submit"
            disabled={!type && !input}
            onClick={addTodo}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
        </form>
        <div>
          <ul className="list">
            {todos.map((todo) => (
              <ToDo key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
