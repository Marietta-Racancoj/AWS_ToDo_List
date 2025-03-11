import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AddTaskForm } from "./component/AddTaskForm";
import { Task } from "./component/Task";

// import axios from "axios";           //may switch to invoked lmabda
// import { API_URL } from "./utils";  //may switch to invoked lmabda

import { invokeLambda } from "../utils";  // updated function



const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [tasks, setTasks] = useState([]);

  // //Below may be replaced with invokeLambda-------
  // const fetchTasks = async () => {
  //   try {
  //     const { data } = await axios.get(API_URL);

  //     setTasks(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // //OR-------

  const fetchTasks = async () => {
    try {
      const response = await invokeLambda({
        httpMethod: "GET",
      });
  
      setTasks(response);
    } catch (err) {
      console.log("Error fetching tasks:", err);
    }
  };
  

  useEffect(() => {  
    fetchTasks();
  }, []);         //only call this function when the page first loads

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AddTaskForm fetchTasks={fetchTasks} />
      {tasks.map((task) => (
        <Task task={task} key={task.id} fetchTasks={fetchTasks} />    //map each task from the task component
      ))}
    </ThemeProvider>
  );
}