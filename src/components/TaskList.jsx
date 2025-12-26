import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import FilterBar from "./FilterBar";

const API = "https://student-task-manager-2-60lq.onrender.com/api/tasks";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks
    .filter(task => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .sort((a, b) => {
      if (sort === "dueDate") return new Date(a.dueDate) - new Date(b.dueDate);
      if (sort === "priority") {
        const order = { low: 1, medium: 2, high: 3 };
        return order[a.priority] - order[b.priority];
      }
      return 0;
    });

  return (
    <>
      <FilterBar setFilter={setFilter} setSort={setSort} />
      {filteredTasks.length === 0 && <p>No tasks found</p>}
      {filteredTasks.map(task => (
        <TaskCard key={task._id} task={task} refresh={fetchTasks} />
      ))}
    </>
  );
}
