import { useState, useEffect } from "react"
import {ContextProvider, } from './Contexts'
import TaskForm from './Components/TaskForm'
import TaskItems from "./Components/TaskItems"


function App() {
    const [tasks , setTasks] = useState([])
    const addTask = (task) =>{
      setTasks((prev) =>[{id : Date.now(), ...task}, ...prev])


    }
    
    const updateTask = (id, task) =>{
      setTasks((prev) =>prev.map((prevTask) =>(prevTask.id === id ? task : prevTask)))



    }

    const deleteTask = (id) =>{
      setTasks((prev) =>prev.filter((task) => task.id !== id))


    }
    
    const taskCompleted = (id) =>{
      setTasks((prev) =>prev.map((prevTask) => prevTask.id === id ?{...prevTask, completed : !prevTask.completed} :prevTask ))
    }

    useEffect(() => {
      const tasks = JSON.parse(localStorage .getItem("tasks"))
      if(tasks && tasks.length>0){
          setTasks(tasks)
      }
    }, [])

    useEffect(() =>{
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])
    

  return (
    <ContextProvider value={{tasks, addTask, updateTask, deleteTask, taskCompleted}}> 
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-5xl font-bold text-center mb-8 mt-2">Manage Your Task</h1>
          <div className="mb-4">
            {/* Task form goes here */} 
            <TaskForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TaskItem here */}
            {tasks.map((task) =>(
              <div key={task.id} className="w-full">
                <TaskItems task= {task}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContextProvider>
  )
}

export default App
