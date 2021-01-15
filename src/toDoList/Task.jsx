import React, { Component } from 'react';
//import { Card, Container, InputGroup, Button, FormControl, Row, Col } from 'react-bootstrap';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import idGenerator from './idGenerator'


class Task extends Component {
  state = {
    checked:false,
  }
  
  handleCheck = ()=>{
    this.setState({
      checked:!this.state.checked
    })
    const{onCheck,data} = this.props;
    onCheck(data._id)

  }
  render() {
    const task = this.props.data
    const {checked} = this.state
    const {disabled} = this.props
    return (
      <div className='task ' >
        <p  className={checked?'chekedtask':''} >
          {task.text}
        </p>
        <div className='delcheck'>
          <button className='delete btn' disabled={disabled} 
          onClick={() => this.props.onRemove(task._id)} >
            <FontAwesomeIcon icon={faTrash} /></button>
          <input onClick={this.handleCheck} type='checkbox'
          //  onClick={() => this.props.onCheck(task._id)}
            key = {task._id}
          />
        </div>
      </div>

    )
  }
}

export default Task