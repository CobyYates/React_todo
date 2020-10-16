import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import db from "./firebase";
import {
  List,
  ListItem,
  Button,
  ListItemText,
  Chip,
  Checkbox,
  TextField,
  Modal,
} from "@material-ui/core";
import "./ToDo.css";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column"
  },
  chips: {
    color: red,
  }
}));


function ToDo(props) {
  const classes = useStyles();
  const [input, setInput] = useState(props.todo.todo);
  let [checked, setCheck] = useState(props.todo.complete);
  const updateTodo = () => {
    // Update the todo
    setOpen(false);
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
        complete: checked,
      },
      { merge: true }
    );
  };
  const [open, setOpen] = useState(false);

  function handleChange(evt) {
    const value = evt.target.checked;
    setCheck(() => (checked = value));
    updateTodo();
  }

  return (
    <>
      <div>
        <Modal
          className="todo_modal"
          open={open}
          onClose={(e) => setOpen(false)}
        >
          <div className={classes.paper}>
            <TextField
              id="todo"
              label="ToDo Item..."
              variant="filled"
              placeholder={props.todo.todo}
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button className="editBtn_icon" variant="contained" onClick={updateTodo}>
              Update
            </Button>
          </div>
        </Modal>
      </div>
      <List className="todo_list" key={props.todo.id}>
        <ListItem key={props.todo.id} className="todo_list">
          <form onSubmit={updateTodo} className="todo_checkbox">
            <Checkbox
              checked={props.todo.complete}
              className="todo_checkbox"
              onChange={handleChange}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </form>
          <div className="todo_type">
            <ListItemText primary={props.todo.todo}  className="todo_text"/>
            <Chip size="small" label={props.todo.type}  className="todo_chip"/>
          </div>
          <div className="todo_icons">
            <EditIcon className="todo_icon edit_icon" onClick={(e) => setOpen(true)} />
            <DeleteIcon
              onClick={(event) =>
                db.collection("todos").doc(props.todo.id).delete()
              }
              variant="contained"
              className="todo_icon delete_icon"
            />
          </div>
        </ListItem>
      </List>
    </>
  );
}

export default ToDo;
