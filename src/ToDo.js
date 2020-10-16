import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import db from "./firebase";
import {
  List,
  ListItem,
  Button,
  ListItemAvatar,
  ListItemText,
  Chip,
  Checkbox,
  TextField,
  Divider,
  Modal,
  FormControlLabel,
} from "@material-ui/core";
import "./ToDo.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
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

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  function handleChange(evt) {
    const value = evt.target.checked;
    setCheck(() => (checked = value));
    // const value =
    //   evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
    // setCheck({
    //   ...checked,
    //   [evt.target.name]: value,
    // });
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
              fullWidth
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button color="secondary" variant="contained" onClick={updateTodo}>
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
              onChange={handleChange}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </form>
          <div className="todo_type">
            <ListItemText primary={props.todo.todo}  className="todo_text"/>
            <Chip size="small" label={props.todo.type}  className="todo_chip"/>
          </div>
          <div className="todo_icons">
            <EditIcon className="todo_icon" onClick={(e) => setOpen(true)} />
            <DeleteIcon
              onClick={(event) =>
                db.collection("todos").doc(props.todo.id).delete()
              }
              color="secondary"
              variant="contained"
              className="todo_icon"
            />
          </div>
        </ListItem>
      </List>
    </>
  );
}

export default ToDo;
