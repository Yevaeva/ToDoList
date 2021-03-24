import React, { PureComponent } from 'react';
import './ToDoList.css'
import AddTask from './AddTask'
import DelCheck from './DelCheck'
import Confirm from './Confirm';
import EditTaskModal from './EditTaskModal';


class ToDoList extends PureComponent {


  state = {
    tasks: [],
    selectedTasks: new Set(),
    showConfirm: false,
    editTask: null,
    openNewTaskModal:false,
  }

  componentDidMount() {
    fetch('http://localhost:3001/task', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },

    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error
        }


        this.setState({
          tasks: response.reverse(),
        })
      })
      .catch((error) => {
        console.log(error);
      })

  }

  addTask = (data) => {


    let body = JSON.stringify(data)

    fetch('http://localhost:3001/task', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error
        }

        const tasks = [response, ...this.state.tasks]

        this.setState({
          tasks: tasks,
          openNewTaskModal:false,
        })
      })
      .catch((error) => {
        console.log(error);
      })
  };

  toggleNewTaskModal =() => {
    this.setState({
      openNewTaskModal:!this.state.openNewTaskModal,
    })
  }

  handleDelete = (_id) => {
    fetch(`http://localhost:3001/task/${_id}`, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' }
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error
        }
        const newTasks = this.state.tasks.filter((item) => item._id !== _id)
        this.setState({
          tasks: newTasks
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }





  handleCheck = (_id) => {
    let selectedTasks = new Set(this.state.selectedTasks);
    if (selectedTasks.has(_id)) {
      selectedTasks.delete(_id)
    } else {
      selectedTasks.add(_id)

    }
    this.setState({
      selectedTasks
    })
  }

  removeSelected = () => {

    let data = {
      tasks: [...this.state.selectedTasks],
    }
    fetch('http://localhost:3001/task', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error
        }

        let tasks = [...this.state.tasks];
        this.state.selectedTasks.forEach((_id) => {
          tasks = tasks.filter((task) => {
            return task._id !== _id
          })
        })
        this.setState({
          tasks,
          selectedTasks: new Set(),
          showConfirm: false,
        })
      })
      .catch((error) => {
        console.log(error);
      })


  }


  toggleConfirm = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    })
  }

  toggleEdit = (task) => {
    this.setState({
      editTask: task
    })
  }

  handleSave = (editedTask) => {


    fetch(`http://localhost:3001/task/${editedTask._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedTask)

    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          throw response.error
        }
        let tasks = [...this.state.tasks];
        let newTaskIndex = tasks.findIndex((task) => task._id === editedTask._id);
        tasks[newTaskIndex] = response;
        this.setState({
          tasks: tasks,
          editTask: null,
        })
      })
      .catch((error) => {
        console.log(error);
      })


  }



  render() {

    let { selectedTasks, showConfirm, editTask, openNewTaskModal } = this.state;

    let tasks = this.state.tasks.map((item) => {


      return (
        <DelCheck
          tasks={item}
          handleDelete={this.handleDelete}
          handleCheck={this.handleCheck}
          disabled={!!selectedTasks.size}
          toggleEdit={this.toggleEdit} />
      )

    })

    return (
      <div className='back'>
        <div className='list'>
        <h1>
          To Do List
        </h1>
         

          <button
            className='btn'
            onClick={this.toggleNewTaskModal}
            disabled={!!selectedTasks.size}>
            Add
          </button>
          {tasks}
          <button
            className='btn'
            onClick={this.toggleConfirm}
            disabled={!selectedTasks.size}>
            Remove selected
        </button>
        </div>
        {
          showConfirm &&
          <Confirm
            handleClose={this.toggleConfirm}
            handleAdd={this.removeSelected}
            count={selectedTasks.size} />
        }
        {
          editTask &&
          <EditTaskModal
            task={editTask}
            onSave={this.handleSave}
            onClose={() => this.toggleEdit(null)}
          />

        }
        {
          openNewTaskModal &&
           <AddTask
           addTask={this.addTask}
           onClose={this.toggleNewTaskModal} />
        }

      </div>


    )
  }
}





export default ToDoList