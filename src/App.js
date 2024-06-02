import logo from "./logo.svg"
import "./App.css"
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import { useState } from "react"
import AddTask from "./components/AddTask"

function App() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: "Go to the shop",
            day: "Jun 5th at 10:00",
            reminder: true,
        },
        {
            id: 2,
            text: "Watching football",
            day: "Jun first at 21:00",
            reminder: true,
        },
        {
            id: 3,
            text: "Buy beer with snacks",
            day: "Jun first at 17:00",
            reminder: false,
        },
    ])

    const [open, setOpen] = useState(false)

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = (id) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: !task.reminder } : task)))
    }

    const addTask = (task) => {
        let _id = Math.floor(Math.random() * 10000)
        let newTask = { ...task, id: _id }
        setTasks([...tasks, newTask])
    }

    const menuAdd = () => {
        setOpen((open) => !open)
    }
    return (
        <div className="container">
            <Header title="Task Tracker" menuAdd={menuAdd} open={open} />
            {open && <AddTask addTask={addTask} />}

            {tasks.length > 0 ? (
                <Tasks tasks={tasks} deleteTask={deleteTask} toggleReminder={toggleReminder} />
            ) : (
                "No Tasks To Show"
            )}
        </div>
    )
}

export default App
