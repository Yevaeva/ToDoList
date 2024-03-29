import { Modal, Button } from "react-bootstrap";
import React from "react";
import PropTypes from "prop-types";
export default function Confirm(props) {
  return (
    <Modal centered show={true} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure to delete {props.count} tasks</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button className="butn" onClick={props.handleClose}>
          Close
        </Button>
        <Button className="butn" onClick={props.handleAdd}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

Confirm.propTypes = {
  count: PropTypes.number.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
