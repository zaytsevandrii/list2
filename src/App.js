import logo from "./logo.svg"
import "./App.css"
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import { useEffect, useState } from "react"
import AddTask from "./components/AddTask"

function App() {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const res = await fetch("http://localhost:5000/tasks")
            const data = await res.json()
            setTasks(data)
        }
        getTasks()
    }, [])

    const [open, setOpen] = useState(false)

    //Delete Task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "DELETE",
        })
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = async (id) => {
        const resTask = await fetch(`http://localhost:5000/tasks/${id}`)
        const taskToToggle = await resTask.json()

        const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updateTask),
        })
        const data = await res.json()

        setTasks(tasks.map((task) => (task.id === id ? { ...task, reminder: data.reminder } : task)))
    }

    const addTask = async (task) => {
        const res = await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(task),
        })
        const data = await res.json()
        setTasks([...tasks, data])

        // let _id = Math.floor(Math.random() * 10000)
        // let newTask = { ...task, id: _id }
        // setTasks([...tasks, newTask])
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
