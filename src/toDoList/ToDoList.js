import React, { Component } from 'react';
import './ToDoList.css'



let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

class ToDo extends Component {
  state = {
    tasks: [],
    inputValue: '',
    dateValue:new Date().getFullYear().toString() + '-' + ((new Date().getMonth()) + 1).toString() + '-' + new Date().getDate().toString(),
    weekDay: days[new Date(this.dateValue).getDay()],
  }


  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    })
    console.log(this.state.inputValue);
  }
  addTask = () => {
    let newTask = [...this.state.tasks]
    if (this.state.inputValue !== '') {
      newTask.push(this.state.inputValue);
    }
    console.log(newTask);
    console.log(this.state.inputValue);

    this.setState({
      tasks: newTask,
      inputValue: '',
    })
  }

  dateChange = (event) => {
    this.setState({
      weekDay: days[new Date(this.state.dateValue).getDay()],

      dateValue: event.target.value,
    })
    console.log(this.state.dateValue);
    
  }

  render() {
    const { inputValue, tasks, dateValue, weekDay} = this.state;
    return (
      <div className='back'>
        <div className='list'>
          <div className='date'>
            <p>{weekDay}</p>
            <input type="date" onChange={this.dateChange} value={dateValue} min={dateValue} />
          </div>
          <h1>To Do List</h1>
          <input className='txtinput' type='text' placeholder='Add new task' onChange={this.handleChange} value={inputValue} />
          <input className='btn' type='button' value='Add' onClick={this.addTask} />
          <ol>
            {
              tasks.map((task, index) => {
                return <li key={index} >{task}</li>
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}



export default ToDo