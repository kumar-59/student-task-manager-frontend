import { useState } from "react";
import axios from "axios";

const API = "https://student-task-manager-2-60lq.onrender.com/api/tasks";

export default function AddTask({ refresh }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitTask = async () => {
    if (!form.title) return alert("Title required");

    await axios.post(API, form);
    setForm({ title: "", description: "", priority: "low", dueDate: "" });
    refresh();
  };

  return (
    <div className="card">
      <h3>Add Task</h3>

      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />

      <button onClick={submitTask}>Add Task</button>
    </div>
  );
}
