import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddTask from './Components/AddTask';
import UpdateTask from './Components/UpdateTask';
import TodoList from './Components/TodoList'; // Corrected import statement

function App() {
  const [todolist, setTodolist] = useState([]);
  const [tasktoUpdate, setTasktoUpdate] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/tasks')
      .then(res => {
        setTodolist(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const addTask = newtask => { // Corrected parameter name from newTask to newtask
    setTodolist([...todolist, newtask]); // Corrected variable name from newTask to newtask
  };

  const taskComplete = task => {
    const newList = [...todolist];
    newList.forEach(item => {
      if (task._id === item._id) { // Corrected comparison from task._id === task._id to task._id === item._id
        item.isComplete = task.isComplete;
      }
    });
    setTodolist(newList);
  };

  const removeTask = task => {
    const newList = todolist.filter(item => item._id !== task._id); // Corrected filter condition
    setTodolist(newList);
  };

  const updateTask = task => {
    const newList = [...todolist];
    newList.forEach(item => {
      if (item._id === task._id) {
        item.todo = task.todo;
      }
    });
    setTodolist(newList);
  };

  return (
    <div>
      <AddTask addTask={addTask} />
      <TodoList 
        todolist={todolist} 
        taskComplete={taskComplete}
        removeTask={removeTask}
        tasktoUpdate={task => setTasktoUpdate(task)} 
        showPopup={() => setShowPopup(!showPopup)}
      />
      {showPopup && <UpdateTask 
        task={tasktoUpdate} 
        updatetask={updateTask}
        removePopup={() => setShowPopup(!showPopup)}
      />}
    </div>
  );
}

export default App;
