import request from "../helpers/request"
import * as actionTypes from './actionTypes'

const apiUrl = process.env.REACT_APP_API_URL
export const getTasks = (data={}) =>{
    let url = `${apiUrl}/task`;
    let query = '?';
    for(let key in data){
        query = `?${key}=${data[key]}&`
    }
    if(query === '?') query = ''
    return (dispatch)=>{
        dispatch({type:actionTypes.LOADING})
        request(url+query)
        .then(res=>{
            dispatch({type:actionTypes.GET_TASKS_SUCCESS, tasks:res.reverse()})
        })
        .catch((error) => {
            dispatch({type:actionTypes.ERROR, errorMessage:error.message})
          })
    }
   
}


export const addTask = (data) =>{
    return (dispatch)=>{
        dispatch({type:actionTypes.LOADING})
        request(`${apiUrl}/task`,"POST",data)
        .then(res=>{
            dispatch({type:actionTypes.ADD_TASK_SUCCESS, task:res})
        })
        .catch((error) => {
            dispatch({type:actionTypes.ERROR, errorMessage:error.message})
          })
    }
   
}

export const removeTask = (taskId) =>{
    return (dispatch)=>{
        dispatch({type:actionTypes.LOADING})
        request(`${apiUrl}/task/${taskId}`,"DELETE")
        .then(res=>{
            dispatch({type:actionTypes.REMOVE_TASK_SUCCESS, taskId})
        })
        .catch((error) => {
            dispatch({type:actionTypes.ERROR, errorMessage:error.message})
          })
    }
   
}

export const removeSelected = (taskIds) =>{
    return (dispatch)=>{
        dispatch({type:actionTypes.LOADING})
        request(`${apiUrl}/task`,"PATCH", {tasks:taskIds})
        .then(()=>{
            dispatch({type:actionTypes.REMOVE_SELECTED_TASKS_SUCCESS, taskIds})
        })
        .catch((error) => {
            dispatch({type:actionTypes.ERROR, errorMessage:error.message})
          })
    }
   
}

export const editTask = (data, from) =>{
    return (dispatch)=>{
        dispatch({type:actionTypes.LOADING})
        request(`${apiUrl}/task/${data._id}`,"PUT", data)
        .then((editedTask)=>{
            dispatch({type:actionTypes.EDIT_TASK_SUCCESS, task:editedTask, from})
        })
        .catch((error) => {
            dispatch({type:actionTypes.ERROR, errorMessage:error.message})
          })
    }
   
}

export const changeStatus = (status,id, from = 'all') =>{
    return (dispatch)=>{
        dispatch({type:actionTypes.LOADING})
        request(`${apiUrl}/task/${id}`,"PUT", status)
        .then((editedTask)=>{
            dispatch({type:actionTypes.CHANGE_TASK_STATUS_SUCCESS, task:editedTask, from})
        })
        .catch((error) => {
            dispatch({type:actionTypes.ERROR, errorMessage:error.message})
          })
    }
   
}

export const getSingleTask = (taskId) =>{
    return (dispatch)=>{
        dispatch({type:actionTypes.LOADING})
        request(`${apiUrl}/task/${taskId}`)
        .then(res=>{
            dispatch({type:actionTypes.GET_SINGLE_TASK_SUCCESS, task : res})
        })
        .catch((error) => {
            dispatch({type:actionTypes.ERROR, errorMessage:error.message})
          })
    }
   
}

export const sendContact = (data) =>{
    return (dispatch)=>{
        dispatch({type:actionTypes.LOADING})
        request(`${apiUrl}/form`,"POST",data)
        .then(res=>{
            dispatch({type:actionTypes.SEND_CONTACT_SUCCESS})
        })
        .catch((error) => {
            dispatch({type:actionTypes.ERROR, errorMessage:error.message})
          })
    }
   
}