import { useState } from "react";
import axios from "axios";

const API = "https://student-task-manager-2-60lq.onrender.com/api/tasks";

export default function TaskCard({ task, refresh }) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(task.title);

  const toggleComplete = async () => {
    await axios.put(`${API}/${task._id}`, {
      completed: !task.completed
    });
    refresh();
  };

  const saveEdit = async () => {
    await axios.put(`${API}/${task._id}`, { title });
    setEdit(false);
    refresh();
  };

  const deleteTask = async () => {
    await axios.delete(`${API}/${task._id}`);
    refresh();
  };

  return (
    <div className="card">
      {edit ? (
        <>
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <button onClick={saveEdit}>Save</button>
        </>
      ) : (
        <h3 style={{ textDecoration: task.completed ? "line-through" : "" }}>
          {task.title}
        </h3>
      )}

      <p>Priority: {task.priority}</p>
      <p>Due: {task.dueDate?.slice(0, 10)}</p>

      <button onClick={toggleComplete}>
        {task.completed ? "Undo" : "Complete"}
      </button>

      <button onClick={() => setEdit(!edit)}>Edit</button>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
}
