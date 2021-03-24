import React from 'react'
import Spinner from '../spinner/Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditTaskModal from '../EditTaskModal'

class SingleTask extends React.PureComponent {
    state = {
        task: null,
        openEditModal: false
    }

    componentDidMount() {
        fetch(`http://localhost:3001/task/${this.props.match.params.id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.error) {
                    throw response.error
                }
                this.setState({
                    task: response,
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    onRemove = () => {
        const taskId = this.state.task._id;
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.error) {
                    throw response.error
                }
                this.props.history.push('/')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    toggleEditModal = () => {
        this.setState({
            openEditModal: !this.state.openEditModal
        })
    }

    handleSave = (editedTask) => {
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editedTask)

        })
            .then((res) => res.json())
            .then((response) => {
                if (response.error) {
                    throw response.error
                }
    

                this.setState({
                    task: response,
                    openEditModal: false
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    render() {
        const { task, openEditModal } = this.state
        return (
            <>
                {!!task ? <div>
                    <div className='text'>
                        <div>

                            Title: {task.title}

                        </div>
                        <div>Description: {task.description}</div>
                        <div>Date: {task.date.slice(0, 10)}</div>
                    </div>
                </div> : <div><Spinner /></div>}
                
                <button
                    className='delete btn'
                    onClick={this.onRemove}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>

                <button
                    onClick={this.toggleEditModal}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                {
                    openEditModal &&
                    <EditTaskModal
                        task={task}
                        onSave={this.handleSave}
                        onClose={this.toggleEditModal}
                    />
                }
            </>
        )
    }

}

export default SingleTask