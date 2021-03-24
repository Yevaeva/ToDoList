import * as actionTypes from './actionTypes'



const defaultState = {
    tasks: [],
    task: null,
    errorMessage: '',
    successMessage: '',
    loading: false,
    addTaskSuccess: false,
    removeSelectedTasksSuccess: false,
    editTaskSuccess: false,
}
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading: true,
                addTaskSuccess: false,
                removeSelectedTasksSuccess: false,
                editTaskSuccess: false,
                errorMessage: '',
                successMessage: ''
            }
        case "ERROR":
            return {
                ...state,
                errorMessage:'❌❌❌ '+ action.errorMessage ,
                loading: false,
            }
        case actionTypes.GET_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.tasks,
                loading: false,
            }
            case actionTypes.GET_SINGLE_TASK_SUCCESS:
            return {
                ...state,
                task: action.task,
                loading: false,
            }
        case "ADD_TASK_SUCCESS": {
            let tasks = [...state.tasks, action.task]
            return {
                ...state,
                tasks: tasks,
                loading: false,
                successMessage: '✅✅✅ Task added successfully!!!',
                addTaskSuccess: true
            }
        }
        case actionTypes.REMOVE_TASK_SUCCESS: {
            const newTasks = state.tasks.filter((item) => item._id !== action.taskId)
            return {
                ...state,
                tasks: newTasks,
                loading: false,
                successMessage: '🗑🗑🗑 Task deleted successfully!!!',
            }
        }
        case actionTypes.REMOVE_SELECTED_TASKS_SUCCESS: {
            let tasksCopy = [...state.tasks];
            action.taskIds.forEach((_id) => {
                tasksCopy = tasksCopy.filter((task) => {
                    return task._id !== _id
                })
            })
            return {
                ...state,
                tasks: tasksCopy,
                loading: false,
                successMessage: '🗑🗑🗑 Tasks deleted successfully!!!',
                removeSelectedTasksSuccess: true,

            }
        }
        case actionTypes.EDIT_TASK_SUCCESS: {
            if(action.from === 'single'){
                return {
                    ...state,
                    task: action.task,
                    loading: false,
                    successMessage: '🖍🖍🖍 Task edited successfully!!!',
                    editTaskSuccess: true,
                }
            }else {
                let tasks = [...state.tasks];
                let newTaskIndex = tasks.findIndex((task) => task._id === action.task._id);
                tasks[newTaskIndex] = action.task;
                return {
                    ...state,
                    tasks: tasks,
                    loading: false,
                    successMessage: '🖍🖍🖍 Task edited successfully!!!',
                    editTaskSuccess: true,
                }
            }
            
        }
        case actionTypes.CHANGE_TASK_STATUS_SUCCESS: {
            let message = ''
            if(action.task.status === 'active'){
                message = '🔃🔃🔃 The task is active now'
            }else {
                message = '✅✅✅ Congratulations, task has completed'
            }
            if(action.from === 'single'){
                return {
                    ...state,
                    task: action.task,
                    loading: false,
                    successMessage:message,
                }
            }else {
                let tasks = [...state.tasks];
                let newTaskIndex = tasks.findIndex((task) => task._id === action.task._id);
                tasks[newTaskIndex] = action.task;
                return {
                    ...state,
                    tasks: tasks,
                    loading: false,
                    successMessage: message,
                }
            }
            
        }
        case actionTypes.SEND_CONTACT_SUCCESS: {
            return {
                ...state,
                loading: false,
                successMessage: '✅✅✅ Your message was sent successfully!!!',
            }
        }
        default:
            return state
    }
}


export { reducer }