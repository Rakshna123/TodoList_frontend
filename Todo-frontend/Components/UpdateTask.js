import React, { useState } from 'react';
import '../Style/Updatetask.css';
import axios from 'axios';

function UpdateTask(props) {
    const [task, setTask] = useState(props.task.todo);

    const updateTask = () => {
        if (task.trim() === '' || props.task.todo === task) {
            return;
        } else {
            axios.put(`http://localhost:8000/api/tasks/${props.task._id}`, {
                todo: task,
                isComplete: props.task.isComplete
            }).then(res => {
                props.removePopup();
                props.updatetask(res.data);
            }).catch(err => console.log(err));
        }
    };

    return (
        <div className='popup'>
            <div className='popup-content'>
                <input
                    type='text'
                    placeholder='Update Task...'
                    value={task}
                    onChange={event => setTask(event.target.value)}
                />
                <button onClick={() => updateTask()}>Update</button>
                <br/>
                <button onClick={props.removePopup}>Close</button>
            </div>
        </div>
    );
}

export default UpdateTask;
