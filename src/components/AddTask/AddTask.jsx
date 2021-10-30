import React, { createRef, PureComponent } from "react";
import { Modal, Button } from "react-bootstrap";
import "./addTask.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { addTask } from "../../store/actions";
class AddTask extends PureComponent {
  constructor() {
    super();
    this.inputRef = createRef();
    this.state = {
      title: "",
      description: "",
      date: new Date(),
    };
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
  handleChange = (event, type) => {
    this.setState({
      [type]: event.target.value,
    });
  };

  handleDateChange = (date) => {
    this.setState({
      date,
    });
  };

  addTask = () => {
    if (!this.state.title) {
      return;
    }
    let task = {
      title: this.state.title,
      description: this.state.description,
      date: this.state.date.toISOString().slice(0, 10),
    };
    this.props.addTask(task);
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.addTask();
    }
  };

  render() {
    let { date } = this.state;
    let { onClose } = this.props;
    return (
      <Modal centered show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            ref={this.inputRef}
            className="txtinput"
            type="text"
            placeholder="Title"
            onChange={(event) => this.handleChange(event, "title")}
            onKeyDown={this.handleKeyDown}
          />
          <div>
            <textarea
              rows="5"
              placeholder="description"
              onChange={(event) => this.handleChange(event, "description")}
            ></textarea>
          </div>
          <DatePicker selected={date} onChange={this.handleDateChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className="butn" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" className="butn" onClick={this.addTask}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  addTask: addTask,
};

export default connect(null, mapDispatchToProps)(AddTask);
