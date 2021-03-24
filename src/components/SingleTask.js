import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faHistory, faCheck } from '@fortawesome/free-solid-svg-icons';
import EditTaskModal from './EditTaskModal'
import { connect } from 'react-redux';
import { changeStatus, getSingleTask, removeTask } from '../store/actions';
import styles from './SingleTask.module.css'

class SingleTask extends React.PureComponent {
    state = {
        openEditModal: false
    }

    componentDidMount() {
        let taskId = this.props.match.params.id
        this.props.getSingleTask(taskId)

    }

    componentDidUpdate(prevProps) {
        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.setState({
                openEditModal: false
            })
        }
    }


    onRemove = () => {
        const taskId = this.props.task._id;
        this.props.removeTask(taskId)
        this.props.history.push('/')

    }

    toggleEditModal = () => {
        this.setState({
            openEditModal: !this.state.openEditModal
        })
    }


    render() {
        const { openEditModal } = this.state
        const { task } = this.props
        return (
            <div className={styles.singleWrapper}>
                {!!task ?
                    <div className={styles.singleTask}>

                        <h3>
                            {task.title.toUpperCase()}

                        </h3>
                        {task.description &&
                            <p>{task.description} </p>}
                        <div className={styles.text}>

                            <div>Date: {task.date.slice(0, 10)}</div>
                            <div>Created at: {task.created_at.slice(0, 10)}</div>
                            <div>Status: {task.status}</div>
                        </div>
                        <div className={styles.delcheck}>

                            {task.status === 'active' ?
                                <button
            className='btn'

                                    onClick={() => this.props.changeStatus({ status: 'done' }, task._id, 'single')}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </button> :
                                <button
            className='btn'

                                    onClick={() => this.props.changeStatus({ status: 'active' }, task._id, 'single')}>
                                    <FontAwesomeIcon icon={faHistory} />
                                </button>
                            }
                            <button
            className='btn'

                                onClick={this.toggleEditModal}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>

                            <button
                                className='delete btn'
                                onClick={this.onRemove}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>

                            </div>

                            </div> : <div>No task found!</div>}
                {
                                openEditModal &&
                                <EditTaskModal
                                    task={task}
                                    from='single'
                                    onClose={this.toggleEditModal}
                                />
                            }
                        </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
                            task: state.task,
        editTaskSuccess: state.editTaskSuccess
    }
}


const mapDispatchToProps = {
                            getSingleTask: getSingleTask,
    removeTask: removeTask,
    changeStatus: changeStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask)