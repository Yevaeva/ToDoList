import { InputGroup, FormControl,  Accordion, Button } from 'react-bootstrap'
import styles from './Sear.module.css'
import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { getTasks } from '../../store/actions';
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp,faCog, faSearch } from '@fortawesome/free-solid-svg-icons';


const statusOptions = [
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



const Sear = (props) => {

    let [status, setStatus] = useState('')

    let [sort, setSort] = useState('')

    let [dates, setDates] = useState({
        create_lte: null,
        create_gte: null,
        complete_lte: null,
        complete_gte: null,
    })

    let [search, setSearch] = useState('')

    let [toggle,setToggle] = useState(false)



    const handleSubmit = () => {
        const data = {};
        for (let key in dates) {
            if (dates[key]) {
                data[key] = dates[key].toLocaleDateString()
            }
        }
        if (search) data.search = search;
        if (sort) data.sort = sort;
        if (status) data.status = status;
        console.log(data)
        props.getTasks(data)

    }
    const toggleSubmit =()=>{
        handleSubmit();
        setToggle(!toggle)


    }
    const sortHandleChange = (e) => {
        if (e) {
            setSort(e.value)
        }

    }

    const statusHandleChange = (e) => {
        if (e) {
            setStatus(e.value)
        }

    }



    return (
        <div className={styles.searchWrapper}>
            <Accordion>
                <div className={styles.search}>
                    <InputGroup>
                        <FormControl
                           className={styles.searchInput}
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <InputGroup.Append className={styles.advSearch}>
                            <Accordion.Toggle 
                            onClick  = {()=>setToggle(!toggle)}
                            className={styles.buttonToggle  } 
                            eventKey="0" variant="outline-secondary">
                                < FontAwesomeIcon icon={faCog} />  {" F i l t e r  " }
                                {toggle?<FontAwesomeIcon icon={faCaretUp} />:<FontAwesomeIcon icon={faCaretDown} />}
                                
                            </Accordion.Toggle>
                        </InputGroup.Append>
                        <InputGroup.Append>
                            <Button
                            onClick={handleSubmit}
                             className={styles.searchBtn} variant="outline-secondary"><FontAwesomeIcon icon={faSearch} /></Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <Accordion.Collapse eventKey="0">
                    <div className={styles.advancedOptions}>
                        <Select
                            placeholder='Choose status'
                            options={statusOptions}
                            isClearable={true}
                            isSearchable={false}
                            onChange={statusHandleChange}
                        />
                        <Select
                            placeholder='Sort'
                            options={sortOptions}
                            isClearable={true}
                            isSearchable={false}
                            onChange={sortHandleChange}
                        />
                        {
                            dateOptions.map((item, index) => {
                                return (
                                    <div className={styles.dateWrapper} key={index}>
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
                </Accordion.Collapse>
               
               { toggle &&
                <Accordion.Toggle 
                className={styles.buttonToggle+' '+ styles.searchToggle+' butn'} 
                onClick={toggleSubmit}    
                         eventKey="0">
                            Search
                    </Accordion.Toggle>
           }
            </Accordion>

        </div>

    )
}



const mapDispatchToProps = {
    getTasks: getTasks
}


export default connect(null, mapDispatchToProps)(Sear)