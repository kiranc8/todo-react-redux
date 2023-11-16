// actions.js
export const addTask = (task) => ({
    type: 'ADD_TASK',
    payload: task,
  });
  
  export const deleteTask = (taskId) => ({
    type: 'DELETE_TASK',
    payload: taskId,
  });
  
  export const completeTask = (taskId) => ({
    type: 'COMPLETE_TASK',
    payload: taskId,
  });
  
  export const editTask = (taskId, newName) => ({
    type: 'EDIT_TASK',
    payload: { taskId, newName },
  });
  
  export const setPriority = (taskId, priority) => ({
    type: 'SET_PRIORITY',
    payload: { taskId, priority },
  });
  