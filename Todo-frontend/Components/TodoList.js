import React from 'react';
import '../Style/Todolist.css'; // Corrected import path for CSS file
import { FaCheck } from "react-icons/fa";
import { MdEdit, MdClose } from "react-icons/md";
import axios from 'axios';

function TodoList(props) {
  const taskComplete = (task) => {
    axios.put(`http://localhost:8000/api/tasks/${task._id}`, {
      todo: task.todo,
      isComplete: !task.isComplete
    })
    .then(res => {
      console.log('Updated task:', res.data);
      props.taskComplete(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  };

  const removeTask = (id) => {
    axios.delete(`http://localhost:8000/api/tasks/${id}`)
    .then(res => {
      props.removeTask(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  };

  const todolist = props.todolist.map((task, index) => (
    <li key={index} className={task.isComplete ? 'strike' : ''}>
      <div style={{display:"flex"}}>
        <FaCheck className={task.isComplete ? 'isComplete greenCheck' : 'checkicon'} />
        <p className="tasktext" onClick={() => taskComplete(task)}>{task.todo}</p>
      </div>
      <div>
        <MdEdit className='edit' onClick={() => {
          props.tasktoUpdate(task);
          props.showPopup();
        }}/>
        <MdClose className='closes' onClick={() => removeTask(task._id)} />
      </div>
    </li>
  ));

  return (
    <div className='tasklist'>
      <ul>
        {todolist}
      </ul>
    </div>
  );
}

export default TodoList;
