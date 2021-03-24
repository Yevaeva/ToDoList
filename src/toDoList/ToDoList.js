import React, { Component } from 'react';
import './ToDoList.css'
//import { Card, Container, InputGroup, Button, FormControl, Row, Col } from 'react-bootstrap';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import idGenerator from './idGenerator'
import Task from './Task';
import AddTask from './addTasks';
import Confirm from './RemoveModal'

let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let now = new Date().getFullYear().toString() + '-' + ((new Date().getMonth()) + 1).toString() + '-' + new Date().getDate().toString();


class ToDo extends Component {
  state = {
    tasks: [],
    dateValue: now,
    weekDay: days[new Date(now).getDay()],
    selectedTasks: new Set(),
    toggle: false,
  }


  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    })
  }

  addTask = (value) => {

    const newTask = {
      text: this.state.inputValue,
      _id: idGenerator()
    }
    let taskArray = [newTask, ...this.state.tasks]

    this.setState({
      tasks: taskArray,

    })
  }



  dateChange = (event) => {
    this.setState({
      dateValue: event.target.value,
      weekDay: days[new Date(this.state.dateValue).getDay()],

    })


  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.addTask();
    }
  }

  handleDelete = (taskId) => {
    const newTasks = this.state.tasks.filter(task => task._id !== taskId)
    this.setState({
      tasks: newTasks
    })

  }

  handleCheck = (taskId) => {
    console.log(taskId)
    const selectedTasks = new Set(this.state.selectedTasks);
    if (selectedTasks.has(taskId)) {
      selectedTasks.delete(taskId)
    } else {
      selectedTasks.add(taskId);

    }
    this.setState({
      selectedTasks: selectedTasks
    })
  }

  toggleConfirm = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  removeSelected = () => {
    let tasks = [...this.state.tasks];
    this.state.selectedTasks.forEach((id) => {
      tasks = tasks.filter((task) => task._id !== id)
    })

    this.setState({
      tasks,
      selectedTasks: new Set(),
      toggle: false,
    })

  }




  render() {
    const { selectedTasks, dateValue, weekDay, toggle } = this.state;
    const tasks = this.state.tasks.map((task, i) => {
      return (
        <Task
          data={task}
          onRemove={this.handleDelete}
          onCheck={this.handleCheck}
          disabled={!!selectedTasks.size}
        />
      )
    })

    return (
      <div className='back'>
        <div className='list'>
          <p>{dateValue}</p>
          <div className='date'>
            <p>{weekDay}</p>
            <input type="date"
              onChange={this.dateChange} value={dateValue} min={dateValue} />
          </div>

          <AddTask
            onAdd={this.addTask}
            count={selectedTasks.size}
          />

          <ol >
            {
              tasks.map((task, index) => {
                return <li key={index} >{task}</li>
              })
            }
          </ol>
          <button onClick={this.toggleConfirm} className='btn' >Remove selected</button>
        </div>

        {toggle &&
          <Confirm
            onSubmit={this.removeSelected}
            onClose={this.toggleConfirm}
            count={selectedTasks.size}
          />
        }


      </div>
    )
  }
}



export default ToDo