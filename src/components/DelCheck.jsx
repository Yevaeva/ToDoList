import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faCheck, faHistory } from '@fortawesome/free-solid-svg-icons';
// import './ToDoList.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { changeStatus, removeTask } from '../store/actions';
import { trimString } from '../helpers/utils';
import styles from './DelCheck.module.css'


class DelCheck extends Component {

  state = {
    checked: false,
  }

  checkHandler = () => {
    this.setState({
      checked: !this.state.checked
    })
    this.props.handleCheck(this.props.tasks._id)
  }

  static propTypes = {

    handleDelete: PropTypes.func,
    handleCheck: PropTypes.func,
    disabled: PropTypes.bool,
  }





  render() {
    let { tasks, disabled } = this.props;
    let { checked } = this.state




    return (
      <div className={checked ? styles.checked + ' ' + styles.line : styles.line}>
          <h3>
            <Link to={`/task/${tasks._id}`}>
              {(trimString(tasks.title, 11)).toUpperCase()}
            </Link>
          </h3>
         {tasks.description && 
         <p>{trimString(tasks.description, 50)} </p>} 
        <div className={styles.text}>
          <div>Date: {tasks.date.slice(0, 10)}</div>
          <div>Created at: {tasks.created_at.slice(0, 10)}</div>
          <div>Status: {tasks.status}</div>
        </div>
        <div className={styles.delcheck}>
          {tasks.status === 'active' ?
            <button
            className='btn'
              disabled={disabled}

              onClick={() => this.props.changeStatus({ status: 'done' }, tasks._id)}>
              <FontAwesomeIcon icon={faCheck} />
            </button> :
            <button
            className='btn'
              disabled={disabled}
              onClick={() => this.props.changeStatus({ status: 'active' }, tasks._id)}>

              <FontAwesomeIcon icon={faHistory} />
            </button>
          }
          <button
            className='btn'
            disabled={disabled}
            onClick={() => this.props.toggleEdit(tasks)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className={`${styles.delete} btn`}
            onClick={() => this.props.removeTask(tasks._id)}
            disabled={disabled}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <input
            type="checkbox"
            onClick={this.checkHandler}
            key={tasks._id} />
        </div>
      </div>


    )
  }
}

const mapDispatchToProps = {
  removeTask: removeTask,
  changeStatus: changeStatus

}



export default connect(null, mapDispatchToProps)(DelCheck)