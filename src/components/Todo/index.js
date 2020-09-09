import React, { useState, useEffect } from "react";
import "./index.css";
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Button,
  Modal,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import db from "../../firebase";
import { makeStyles } from "@material-ui/core/styles";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "fixed",
    maxWidth: "70%",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    //boxShadow: theme.shadow[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [updatedInput, setUpdatedInput] = useState("");
  const [updatedCurrentTimePost, setUpdatedCurrentTimePost] = useState("");

  useEffect(() => {
    if (updatedCurrentTimePost != "") {
      updateTodo();
    }
  }, [updatedCurrentTimePost]);

  const handleUpdatedCurrentTimePost = (e) => {
    e.preventDefault();
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let houre = d.getHours();
    let minute = d.getMinutes();
    let m = minute < 10 ? "0" + minute : minute;
    let displayDate =
      "last update of todo: " +
      day +
      "." +
      month +
      "." +
      year +
      ", " +
      houre +
      ":" +
      m;
    setUpdatedCurrentTimePost(displayDate);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todoText: updatedInput,
        currentTime: updatedCurrentTimePost,
      },
      { merge: true }
    );
    setOpen(false);
    setUpdatedInput("");
    setUpdatedCurrentTimePost("");
  };

  const body = (
    <div className={`${classes.paper} rrr`} style={modalStyle}>
      <form>
        <h6>{updatedInput.length > 22 && updatedInput}</h6>
        <FormControl>
          <InputLabel>Update Todo</InputLabel>
          <Input
            value={updatedInput}
            onChange={(e) => setUpdatedInput(e.target.value)}
          />
          <Button
            type="submit"
            onClick={handleUpdatedCurrentTimePost}
            disabled={!updatedInput}
          >
            update
          </Button>
        </FormControl>
      </form>
    </div>
  );

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>

      <List className="todo__list">
        <span className="todo__listNum">Todo Nr {props.indexof}</span>
        <ListItem>
          <ListItemAvatar className="ListItemAvatar-aaa">
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={props.todo.todo.todoText}
            secondary={props.todo.todo.currentTime}
          />
        </ListItem>
        <div className="todo__iconsContainer">
          <DeleteForeverIcon
            onClick={(e) => db.collection("todos").doc(props.todo.id).delete()}
            className="deleteIcon"
          />

          <EditIcon className="editIcon" onClick={handleOpen}></EditIcon>
        </div>
      </List>
    </>
  );
}

export default Todo;

/*
this is the t:


{
  id: idCode,
  todo: {
    timestamp: 'fdsf',
    todo: 'texttexttext'
  }
}


*/
