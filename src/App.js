import React, { useState, useEffect } from "react";
import "./App.css";
import { TextField, Button } from "@material-ui/core";
import ToDo from "./ToDo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  // when the app loads, fetch data from the db and put into todos
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);
  const [input, setInput] = useState("");
  const addTodo = (event) => {
    // Prevents the form from refreshing the page
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // This will add the todo item to the db when the add btn is clicked
    setTodos([...todos, input]);
    setInput("");
  };
  return (
    <div className="App">
      <h1>Hello World!</h1>

      <form onSubmit={addTodo}>
        <TextField
          id="todo"
          label="ToDo Item..."
          variant="filled"
          fullWidth
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button
          type="submit"
          disabled={!input}
          onClick={addTodo}
          color="primary"
          variant="contained"
        >
          Add
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <ToDo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
