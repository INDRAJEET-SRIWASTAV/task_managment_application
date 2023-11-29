import { createContext, useContext } from "react";


export const App_context = createContext({
    tasks : [
        {
            id : 1,
            task : "Task Name",
            completed : false
        }
    ],
    addTask : (task) =>{},
    updateTask : (id, task) =>{},
    deleteTask : (id) =>{},
    taskCompleted : (id) =>{}
})

export  const App_Use  = ()=>{
    return useContext(App_context)
}


export const ContextProvider = App_context.Provider