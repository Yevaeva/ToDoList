import { useState } from "react"
import React from 'react'
import styles from './Contacts.module.css'
import { toast } from "react-toastify"
import { connect } from "react-redux"
import { sendContact } from '../../../store/actions'

const Contacts = (props) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = ({ target: { name, value } }) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (values.email && values.name && values.message) {
            if (validateEmail(values.email)) {
                props.sendContact(values)
                console.log(values);
                setValues({
                    name: '',
                    email: '',
                    message: ''
                })
            } else {
                toast.error("Email must be valid ❗❗❗")
            }
        } else {
            toast.error("Fill the all fields ❗❗❗")
        }            


    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (re.test(email));
    }
    return (
        <div className={styles.formStyle}>
            <h1>Contact Us</h1>
            <form>
                <input
                    type='text'
                    placeholder='Your Name *'
                    value={values.name}
                    name='name'
                    onChange={handleChange}
                />
                <input
                    type='email'
                    placeholder='Your Email *'
                    name='email'
                    value={values.email}
                    onChange={handleChange}

                />

                <textarea
                    placeholder="Type your Message *"
                    name='message'
                    onChange={handleChange}
                    value={values.message}>
                </textarea>
                <input
                    type='submit'
                    value='Send'
                    onClick={handleSubmit} />
            </form>
        </div>

    )

}

const mapDispatchToProps = {
    sendContact
}

export default connect(null, mapDispatchToProps)(Contacts)