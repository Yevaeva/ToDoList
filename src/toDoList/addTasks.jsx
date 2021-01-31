import React, { Component } from 'react';
//import { Card, Container, InputGroup, Button, FormControl, Row, Col } from 'react-bootstrap';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import idGenerator from './idGenerator'


export default  class AddTask extends Component{
  state={
    inputValue:'',
  }
  handleKeyDown=(event)=>{
    if(event.key==='Enter'){
      this.addTask();
      }
  }

  addTask = ()=>{
    const {inputValue}=this.state;
    if (!inputValue) {
      return
    }

    this.props.onAdd(inputValue)
    this.setState({
      inputValue:''
    })
  }

  render(){
    const {inputValue} = this.state.inputValue
    const {disabled } = this.props
    return(
      <div>
       <h1>To Do List</h1>
        <input disabled={!!this.props.count} className='txtinput' type='text' placeholder='Add new task' onChange={this.handleChange} onKeyDown={this.handleKeyDown} value={inputValue} />
        <input className='btn' type='button' value='Add' onClick={this.addTask} />
          
      </div>
    )
  }
}

