import React, { useState } from "react";
import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import axios from "axios";           //may switch to invoked lmabda
import { API_URL } from "../utils";  //may switch to invoked lmabda

// import { invokeLambda } from "../utils";  // updated function

export const UpdateTaskForm = ({
  fetchTasks,
  isDialogOpen,
  setIsDialogOpen,
  task,
}) => {
  const { id, completed } = task;
  const [taskName, setTaskName] = useState("");

  const handleUpdateTaskName = async () => {
    try {
      await axios.put(API_URL, {   //May be replaced with invokeLambda-------
        id,
        name: taskName,
        completed,
      });

    //   await invokeLambda({
    //     httpMethod: "PUT",
    //     body: { id, name: taskName, completed },
    //   });
      

      await fetchTasks();  //updates the task data after change

      setTaskName("");     //clear out form field
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={isDialogOpen}>
      <DialogTitle>Edit Task</DialogTitle>
      <div className="dialog">
        <TextField
          size="small"
          label="Task"
          variant="outlined"
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={async () => {
            await handleUpdateTaskName();
            
            setIsDialogOpen(false);
          }}
        >
          <CheckIcon />
        </Button>
      </div>
    </Dialog>
  );
};