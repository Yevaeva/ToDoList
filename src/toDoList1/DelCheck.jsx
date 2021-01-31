import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import './ToDoList.css'
import idGenerator from './idGenerator'
import PropTypes from 'prop-types'



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
      <ul className={checked ? 'checked' : ''}
        key={tasks._id}>
        <li >
          <div className='line'>
            <div>
              <div>{tasks.title}</div>
              <div>{tasks.description}</div>
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
          </div>
        </li>
      </ul>


    )
  }
}


export default DelCheck