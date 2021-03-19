import React, { Component } from 'react';
//import { Card, Container, InputGroup, Button, FormControl, Row, Col } from 'react-bootstrap';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import idGenerator from './idGenerator'
import {Button, Modal} from 'react-bootstrap'
import propTypes from 'prop-types'

export default function Confirm(props){
    
        return (
          <>
            <Modal centered show={true} onHide={props.onClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to delete</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="primary" 
                onClick={props.onClose}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={props.onSubmit}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      
      
      
}

Confirm.propTypes = {
    count: propTypes.number,
    onClose: propTypes.func,
    onSubmit: propTypes.func,
}