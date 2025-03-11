import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";           //may switch to invoked lmabda
import { API_URL } from "../utils";  //may switch to invoked lmabda

// import { invokeLambda } from "../utils";  // updated function instead of axios

export const AddTaskForm = ({ fetchTasks }) => {  
  const [newTask, setNewTask] = useState("");

  const addNewTask = async () => {
    try {
      await axios.post(API_URL, {   //May be replaced with invokeLambda-------
        name: newTask,
        completed: false,

      //OR

      // await invokeLambda({     //May use Axios and API Gateway instead of invokeLambda
      //   httpMethod: "POST",
      //   body: { name: newTask, completed: false },
      
      });
      

      await fetchTasks();

      setNewTask("");  //clears out input field after new task has been added
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Typography align="center" variant="h2" paddingTop={2} paddingBottom={2}>
        My Task List
      </Typography>
      <div className="addTaskForm">
        <TextField
          size="small"
          label="Task"
          variant="outlined"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button
          disabled={!newTask.length}
          variant="outlined"
          onClick={addNewTask}
        >
          <AddIcon />
        </Button>
      </div>
    </div>
  );
};


