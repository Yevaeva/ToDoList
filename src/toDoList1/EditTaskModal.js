import { Modal, Button } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class EditTaskModal extends React.PureComponent {
  constructor(props) {
    super(props)
    const {date} = props.task
    this.state = {
      ...this.props.task,
      date:date? new Date(date):new Date()
    }
  }

  editChangeHandler = (event) => {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value
    })
  }

  handleDateChange = (date) => {
    this.setState({
      date
    })
  }


  handleSave = () => {
    if (!this.state.title) {
      return
    }
    
    this.props.onSave({...this.state, date: this.state.date.toISOString().slice(0,10)})
  }

  render() {



    return (

      <Modal centered show={true} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type='text'
            name='title'
            value={this.state.title}
            onChange={this.editChangeHandler}
          />
          <div>
            <textarea rows='5'
              name='description'
              placeholder='description'
              value={this.state.description}
              onChange={this.editChangeHandler} ></textarea>

          </div>
          <DatePicker 
          selected={this.state.date} 
          onChange={this.handleDateChange}
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger"
            onClick={this.props.onClose}
          >
            Close
          </Button>
          <Button variant="primary"
            onClick={this.handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>




    )
  }

}

export default EditTaskModal

EditTaskModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,

}