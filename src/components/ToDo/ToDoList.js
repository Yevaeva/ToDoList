import React, { PureComponent } from 'react';
import styles from './ToDoList.module.css'
import AddTask from '../AddTask'
import DelCheck from '../DelCheck'
import Confirm from '../Confirm';
import EditTaskModal from '../EditTaskModal';
import { connect } from 'react-redux';
import { getTasks, removeSelected } from '../../store/actions';
import Sear from '../s/Sear';


class ToDoList extends PureComponent {


  state = {
    selectedTasks: new Set(),
    showConfirm: false,
    editTask: null,
    openNewTaskModal: false,
  }

  componentDidMount() {
    this.props.getTasks()
    console.log(this.props)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
      this.toggleNewTaskModal()
    }

    if (!prevProps.removeSelectedTasksSuccess && this.props.removeSelectedTasksSuccess) {
      this.setState({
        selectedTasks: new Set(),
        showConfirm: false,
      })
    }

    if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
      this.setState({
        editTask: null,

      })
    }

  }


  toggleNewTaskModal = () => {
    this.setState({
      openNewTaskModal: !this.state.openNewTaskModal,
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
    let taskIds = [...this.state.selectedTasks]
    this.props.removeSelected(taskIds)
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

  render() {

    let { selectedTasks, showConfirm, editTask, openNewTaskModal } = this.state;

    let tasks = this.props.tasks.map((item) => {


      return (
        <DelCheck
          tasks={item}
          handleCheck={this.handleCheck}
          disabled={!!selectedTasks.size}
          toggleEdit={this.toggleEdit} />
      )

    })

    return (
      <>
      <Sear />
      <div className={styles.back}>
        
        <div className={styles.list}>
          <h1>
            To Do List
          </h1>


          <button
            className={styles.btn}
            onClick={this.toggleNewTaskModal}
            disabled={!!selectedTasks.size}>
            Add
          </button>
          <div className={styles.tasksWrapper}>
           {tasks}
          </div>
    
          <button 
            className={styles.btn}
            onClick={this.toggleConfirm}
            disabled={!selectedTasks.size}
          style = {{borderRadius:10}}>

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
            from = 'all'
            onClose={() => this.toggleEdit(null)}
          />

        }
        {
          openNewTaskModal &&
          <AddTask
            onClose={this.toggleNewTaskModal} />
        }

      </div>
      </>


    )
  }
}



// const mapDispatchToProps = (dispatch) => {
//   return {
//     getTasks :() =>{
//       dispatch({})
//     }
//   }
// }


const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    addTaskSuccess: state.addTaskSuccess,
    removeSelectedTasksSuccess: state.removeSelectedTasksSuccess,
    editTaskSuccess: state.editTaskSuccess,

  }
}

const mapDispatchToProps = {
  getTasks,
  removeSelected
}



export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)