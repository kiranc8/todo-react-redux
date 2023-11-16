// reducer.js
const initialState = {
    tasks: [],
  };
  
  const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TASK':
        return {
          ...state,
          tasks: [...state.tasks, { ...action.payload, completed: false, priority: 'low' }],
        };
      case 'DELETE_TASK':
        return {
          ...state,
          tasks: state.tasks.filter((task) => task.id !== action.payload),
        };
      case 'COMPLETE_TASK':
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.payload ? { ...task, completed: !task.completed } : task
          ),
        };
      case 'EDIT_TASK':
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.payload.taskId ? { ...task, name: action.payload.newName } : task
          ),
        };
      case 'SET_PRIORITY':
        return {
          ...state,
          tasks: state.tasks.map((task) =>
            task.id === action.payload.taskId ? { ...task, priority: action.payload.priority } : task
          ),
        };
      default:
        return state;
    }
  };
  
  export default todoReducer;
  