import React, { PureComponent } from 'react';
import './ToDoList.css'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap';
import './addTask.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



class AddTask extends PureComponent {

  state = {
    title: '',
    description:'',
    date: new Date(),
  }

  handleChange = (event, type) => {
    this.setState({
      [type]: event.target.value,
    })
  }

  handleDateChange = (date) => {
    this.setState({
      date
    })
  }

  addTask = () => {
    if (!this.state.title) {
      return
    }
    let task = {
      title: this.state.title,
      description:this.state.description,
      date:this.state.date.toISOString().slice(0,10)
    }
    this.props.addTask(task)

  };

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.addTask()

    }

  }




  render() {

    let { date } = this.state;
    let { onClose } = this.props

    return (
        <Modal centered show={true} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add new task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className='txtinput'
              type='text'
              placeholder='Title'
              onChange={(event) => this.handleChange(event, 'title')}
              onKeyDown={this.handleKeyDown}
            />
            <div>
            <textarea rows='5' 
            placeholder='description'
            onChange={(event)=> this.handleChange(event, 'description')} ></textarea>
            </div>
            <DatePicker 
            selected={date} 
            onChange={this.handleDateChange}
            />
          </Modal.Body>
          <Modal.Footer>
  
              <Button variant="danger"
              onClick={onClose}>
              Cancel
              </Button>
            <Button variant="primary"
              onClick={this.addTask}>
              Add
             </Button>
          </Modal.Footer>
        </Modal>
      )
  }
}


export default AddTask

AddTask.propTypes = {
  addTask: PropTypes.func,
}