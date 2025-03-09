import { Button, Checkbox, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import { UpdateTaskForm } from "./UpdateTaskForm";
import classnames from "classnames";

import axios from "axios";           //may switch to invoked lmabda
import { API_URL } from "../utils";  //may switch to invoked lmabda

// import { invokeLambda } from "../utils";  // updated function

export const Task = ({ task, fetchTasks }) => {
  const { id, name, completed } = task;
  const [isComplete, setIsComplete] = useState(completed);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

//   Handels when checkbox is checked and unchecked identifying task by name and id
  const handleUpdateTaskCompletion = async () => {
    try {
      await axios.put(API_URL, {
        id,
        name,
        completed: !isComplete,
      });

    //   await invokeLambda({
    //     httpMethod: "PUT",
    //     body: { id, name, completed: !isComplete },
    //   });

      setIsComplete((prev) => !prev);
    } catch (err) {
      console.log("Error updating task:", err);
    }
  };
//Delete doesn't take in a body, just find task by appending id to task url
  const handleDeleteTask = async () => {
    try {
      await axios.delete(`${API_URL}/${task.id}`);   //May be replaced with invokeLambda-------

    //   await invokeLambda({
    //     httpMethod: "DELETE",
    //     body: { id: task.id },
    //   });
      

      await fetchTasks();
    } catch (err) {
      console.log("Error deleting task:", err);
    }
  };

  return (
    <div className="task">
      <div
        className={classnames("flex", {
          done: isComplete,
        })}
      >
        <Checkbox checked={isComplete} onChange={handleUpdateTaskCompletion} />
        <Typography variant="h4">{name}</Typography>
      </div>
      <div className="taskButtons">
        <Button variant="contained" onClick={() => setIsDialogOpen(true)}>
          <EditIcon />
        </Button>
        <Button color="error" variant="contained" onClick={handleDeleteTask}>
          <DeleteIcon />
        </Button>
      </div>
      <UpdateTaskForm
        fetchTasks={fetchTasks}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        task={task}
      />
    </div>
  );
};