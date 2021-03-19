import React from 'react'
import { FormLabel, Dropdown, Button } from 'react-bootstrap'


const AdvancedOptions = (props) => {


    return (
<div className="advanced-options">
                <FormLabel>Status</FormLabel>
                <Select
                    placeholder='Choose status'
                    options={statusOptions}
                    isClearable={true}
                    isSearchable={false}
                    onChange={statusHandleChange}
                />
                <FormLabel>Sort</FormLabel>
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
                <Dropdown.Item>
                    <Button
                        onClick={handleSubmit}
                        variant="outline-success">
                        Search
                    </Button>
                </Dropdown.Item>
            </div>
    )
}

export default AdvancedOptions