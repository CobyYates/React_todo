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
  TextField,
  Modal,
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
  const updateTodo = () => {
    // Update the todo
      setOpen(false);
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
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
          <Button
            color="secondary"
            variant="contained"
            onClick={updateTodo}
          >
            Update
          </Button>
        </div>
      </Modal>
      <List className="todo_list">
        <ListItem>
          {/* <ListItemAvatar>
              </ListItemAvatar> */}
          <ListItemText primary={props.todo.todo} secondary="Todo" />
        </ListItem>
        <EditIcon onClick={(e) => setOpen(true)} />
        <DeleteIcon
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
          color="secondary"
          variant="contained"
        />
      </List>
    </>
  );
}

export default ToDo;
