import { useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  const [reload, setReload] = useState(false);

  const refresh = () => setReload(!reload);

  return (
    <div>
      <h1>Student Task Manager</h1>
      <AddTask refresh={refresh} />
      <TaskList reload={reload} />
    </div>
  );
}

export default App;
