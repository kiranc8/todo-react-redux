import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  completeTask,
  editTask,
  setPriority,
} from "./redux/action.js";
import styles from "./App.module.css";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";

const App = () => {
  // State variables using React Hooks
  const [newTask, setnewTask] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Accessing the Redux store using useSelector
  const tasks = useSelector((state) => state.tasks);

  // Dispatch function to dispatch actions to Redux store
  const dispatch = useDispatch();

  // Function to handle adding a new task
  const handleAddTask = (task) => {
    // Check if the task name is not empty before dispatching the action
    if (task.name !== "") {
      dispatch(addTask(task));
    }
    // Clear the new task input field
    setnewTask("");
  };

  // Function to handle deleting a task
  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  // Function to handle marking a task as complete or incomplete
  const handleCompleteTask = (taskId) => {
    dispatch(completeTask(taskId));
  };

  // Function to handle editing a task
  const handleEditTask = (taskId, newName) => {
    dispatch(editTask(taskId, newName));
  };

  // Function to handle setting the priority of a task
  const handleSetPriority = (taskId, priority) => {
    dispatch(setPriority(taskId, priority));
  };

  // Function to enable editing mode on double-click
  const handleDoubleClick = (taskId) => {
    setEditingTaskId(taskId);
  };

  // Function to handle input change while editing
  const handleInputChange = (e) => {
    setUpdatedTitle(e.target.value); // Update the updated title state as the input value changes
  };

  // Function to handle input blur (when editing is done)
  const handleInputBlur = (id) => {
    // Disable editing mode
    setEditingTaskId(null);
    // If the updated title is not empty, call the function to edit the task
    if (updatedTitle !== "") {
      handleEditTask(id, updatedTitle);
    }
  };
  return (
    <div className={styles.container}>
      <Typography variant="h4" component="h2" gutterBottom>
        My Todo List
      </Typography>

      {/* Todo input and add button */}
      <Paper elevation={3} className={styles.paper}>
        <Box className={styles.formContainer}>
          <Paper component="form" className={styles.inputContainer}>
            <InputBase
              className={styles.todoInput}
              placeholder="Write your Todos here..."
              value={newTask}
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(e) => {
                setnewTask(e.target.value);
              }}
              fullWidth
            />
            <Divider className={styles.divider} orientation="vertical" />
            <IconButton
              className={styles.addButton}
              color="primary"
              aria-label="directions"
              onClick={() => {
                handleAddTask({ id: Date.now(), name: newTask });
              }}
            >
              <AddIcon />
            </IconButton>
          </Paper>
        </Box>

        {
          <div>
            {tasks.length === 0 ? (
              <div className={styles.wrapper}>You don't have any tasks</div>
            ) : (
              <div className={styles.tasksWrappers}>
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`${styles.todoItem} ${
                      task.completed ? styles.todoItemCompleted : ""
                    }`}
                  >
                    <div>
                      {/* Checkbox for completing a task */}
                      <Checkbox
                        checked={task.completed}
                        size="small"
                        onClick={() => handleCompleteTask(task.id)}
                        icon={<RadioButtonUncheckedOutlinedIcon />} // Icon to display when the checkbox is unchecked
                        checkedIcon={
                          <CheckCircleOutlineIcon style={{ color: "green" }} />
                        }
                      />
                    </div>
                    {/* Task title (editable when in editing mode) */}
                    {editingTaskId === task.id ? (
                      <TextField
                        className={styles.title}
                        value={updatedTitle}
                        onBlur={() => handleInputBlur(task.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && updatedTitle !== "") {
                            handleInputBlur(task.id);
                          }
                        }}
                        onChange={handleInputChange}
                        autoFocus
                        InputProps={{
                          style: { border: "1px solid lightgray" },
                        }}
                      />
                    ) : (
                      <div
                        className={styles.title}
                        onDoubleClick={() => handleDoubleClick(task.id)}
                      >
                        {task.name}
                      </div>
                    )}

                    {/* Priority selection dropdown */}
                    <div>
                      <Select
                        labelId="simple-select-label"
                        id="simple-select"
                        value={task.priority}
                        onChange={(e) =>
                          handleSetPriority(task.id, e.target.value)
                        }
                      >
                        <MenuItem value="low">
                          <Chip label="Low" color="success" />
                        </MenuItem>
                        <MenuItem value="medium">
                          <Chip label="Medium" color="warning" />
                        </MenuItem>
                        <MenuItem value="high">
                          <Chip label="High" color="error" />
                        </MenuItem>
                      </Select>
                    </div>
                    <div>
                      {/* Edit button */}
                      <IconButton>
                        <EditIcon onClick={() => handleDoubleClick(task.id)} />
                      </IconButton>
                      {/* Delete button */}
                      <IconButton aria-label="delete">
                        <ClearIcon
                          className={styles.deleteButton}
                          onClick={() => handleDeleteTask(task.id)}
                        />
                      </IconButton>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        }

        <Divider sx={{ my: 2 }} />
        {/* Task count and completion status */}
        <Typography
          variant="body1"
          component="p"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <span>Total tasks : {tasks.length}</span>
          <span>
            {tasks.filter((task) => !task.completed).length} item(s) left
          </span>
        </Typography>
      </Paper>
    </div>
  );
};

export default App;
