import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { getTasks } from '../../store/actions';

const statusOptions= [
    {
        label: 'Reset',
        value: ''
    },
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Done',
        value: 'done'
    },
]

const sortOptions = [
    {
        label: 'Reset',
        value: ''
    },
    {
        label: 'A-Z',
        value: 'a-z'
    },
    
    {
        label: 'Z-A',
        value: 'z-a'
    },
    {
        label: 'Creation date oldest',
        value: 'creation_date_oldest'
    },
    {
        label: 'Creation date newest',
        value: 'creation_date_newest'
    },
    {
        label: 'Completion date oldest',
        value: 'completion_date_oldest'
    },
    {
        label: 'Completion date newest',
        value: 'completion_date_newest'
    }
]

const dateOptions = [
    {
        label: 'Create earlier than',
        value: 'create_lte'
    },
    
    {
        label: 'Create later than',
        value: 'create_gte'
    },
    {
        label: 'Complete earlier than',
        value: 'complete_lte'
    },
    {
        label: 'Complete later than',
        value: 'complete_gte'
    }
]
function Search(props) {

    let [status, setStatus] = useState({
        label: '',
        value: ''
    })

    let [sort, setSort] = useState({
        label: '',
        value: ''
    })

    let [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null,
    })

    let [search,setSearch] = useState('')



    const handleSubmit = () => {
        const data = {};
        for(let key in dates){
            if(dates[key]){
                data[key] = dates[key].toLocaleDateString()
            }
        }
        if(search) data.search = search;
        if(sort.value) data.sort = sort.value;
        if(status.value) data.status = status.value;
        props.getTasks(data)
 
    }



    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title={status.value ? status.label : "Status"} >
                            {
                                statusOptions.map((item, index) => {
                                    return (
                                        <NavDropdown.Item
                                            key={index}
                                            onClick={() => { setStatus(item) }}
                                            active={status.value === item.value}>
                                            {item.label}
                                        </NavDropdown.Item>
                                    )
                                })
                            }
                        </NavDropdown>
                        <NavDropdown title={sort.value ? sort.label : "Sort"} >
                            {
                                sortOptions.map((item, index) => {
                                    return (
                                        <NavDropdown.Item
                                            key={index}
                                            onClick={() => { setSort(item) }}
                                            active={sort.value === item.value}>
                                            {item.label}
                                        </NavDropdown.Item>
                                    )
                                })
                            }
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl 
                        type="text" 
                        placeholder="Search" 
                        className="mr-sm-2" 
                        value = {search}
                        onChange={(event) => setSearch(event.target.value)}
                        />
                        <Button 
                        onClick={handleSubmit}
                        variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            {
                dateOptions.map((item,index) => {
                    return (
                        <div>
                            <span>{item.label}</span>
                            <DatePicker 
                            selected={dates[item.value]} 
                            onChange={(date) => setDates({
                                ...dates,
                                [item.value]: date
                            })}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}

const mapDispatchToProps = {
    getTasks: getTasks
}


export default connect(null, mapDispatchToProps)(Search)