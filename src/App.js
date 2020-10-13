import React, {useState} from "react";
import "./App.css";
import { TextField, Button } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";

function App() {

  const [todos, setTodos] = useState(['First Task of the day','Second task of the day'])
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <TextField id="todo" label="ToDo Item..." variant="filled" fullWidth />
      <Button color="secondary" variant="contained">
        Add
      </Button>

      <ul>
        {todos.map(todo => (
          <li>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
