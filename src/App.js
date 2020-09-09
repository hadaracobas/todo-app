import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Todo from "./components/Todo";
import Header from "./components/Header";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [currentTimePost, setCurrentTimePost] = useState("");

  // when the app loads, we need to listen to the db and fetch new todos as they get added/removed
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data() }))
        );
      });
  }, []);

  // user click add todo, then set the time of posting todo, then send and set data in db, then pull data map and display
  useEffect(() => {
    if (currentTimePost != "") {
      handleAddTodo();
    }
  }, [currentTimePost]);

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const handleCurrentTimePost = (e) => {
    e.preventDefault();
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let houre = d.getHours();
    let minute = d.getMinutes();
    let m = minute < 10 ? "0" + minute : minute;
    let displayDate = day + "." + month + "." + year + ", " + houre + ":" + m;
    setCurrentTimePost(displayDate);
  };

  const handleAddTodo = () => {
    db.collection("todos").add({
      todoText: input,
      currentTime: currentTimePost,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
    setCurrentTimePost("");
  };

  console.log(todos);
  return (
    <>
      <Header numOfTodo={todos.length} />
      <div className="app">
        <form className="app__form">
          <FormControl className="app__formInputContainer">
            <InputLabel>Write a Todo </InputLabel>
            <Input
              value={input}
              onChange={handleOnChange}
              type="text"
              placeholder="enter the next todo.."
              className="app__formInput"
            />
          </FormControl>
          <div className="app__formButtonContainer">
            <Button
              disabled={!input}
              variant="contained"
              color="primary"
              onClick={handleCurrentTimePost}
              type="submit"
              className="app__formButton"
            >
              Add Todo
            </Button>
          </div>
        </form>

        {todos.length < 1 ? (
          <h3 className="app__noTodoMessage">
            Nothing to do? 🙈<br></br> Add your first todo now!
          </h3>
        ) : (
          todos.map((t) => <Todo indexof={todos.indexOf(t) + 1} todo={t} />)
        )}
      </div>
    </>
  );
}

export default App;

//

/*
this is the t:


{
  id: idCode,
  todo: {
    timestamp: 'fdsf',
    todo: 'texttexttext'
  }
}


      {todos.map((t) => (
        <Todo todo={t} />
      ))}

*/
