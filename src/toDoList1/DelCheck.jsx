import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import './ToDoList.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'



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
    let { tasks, handleDelete, disabled } = this.props;
    let { checked } = this.state




    return (
      <div className= {checked ? 'checked line' : ' line'}>
          {/* <div className='line'> */}
            <div className='text'>
              <div>
                <Link to={`/task/${tasks._id}`}>
                   Title: {tasks.title}
                </Link>
              </div>
              <div>Description: {tasks.description}</div>
              <div>Date: {tasks.date.slice(0,10)}</div>
            </div>


            <div className='delcheck'>
              <button
                disabled={disabled}
                onClick={() => this.props.toggleEdit(tasks)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className='delete btn'
                onClick={() => handleDelete(tasks._id)}
                disabled={disabled}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <input
                type="checkbox"
                onClick={this.checkHandler}
                key={tasks._id} />
            </div>
          {/* </div> */}
      </div>


    )
  }
}


export default DelCheck