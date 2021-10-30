import { Modal, Button } from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { editTask } from "../store/actions";
class EditTaskModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    const { date } = props.task;
    this.state = {
      ...this.props.task,
      date: date ? new Date(date) : new Date(),
    };
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  editChangeHandler = (event) => {
    let name = event.target.name;
    this.setState({
      [name]: event.target.value,
    });
  };

  handleDateChange = (date) => {
    this.setState({
      date,
    });
  };

  handleSave = () => {
    if (!this.state.title) {
      return;
    }
    let data = {
      ...this.state,
      date: this.state.date.toISOString().slice(0, 10),
    };
    this.props.editTask(data, this.props.from);
  };

  render() {
    return (
      <Modal centered show={true} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            ref={this.inputRef}
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.editChangeHandler}
          />
          <div>
            <textarea
              rows="5"
              name="description"
              placeholder="description"
              value={this.state.description}
              onChange={this.editChangeHandler}
            ></textarea>
          </div>
          <DatePicker
            selected={this.state.date}
            onChange={this.handleDateChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            className="butn"
            onClick={this.props.onClose}
          >
            Close
          </Button>
          <Button variant="primary" className="butn" onClick={this.handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  editTask: editTask,
};

export default connect(null, mapDispatchToProps)(EditTaskModal);

EditTaskModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
