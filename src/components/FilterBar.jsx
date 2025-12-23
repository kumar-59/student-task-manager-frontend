export default function FilterBar({ setFilter, setSort }) {
  return (
    <div className="card">
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">No Sort</option>
        <option value="priority">Sort by Priority</option>
        <option value="dueDate">Sort by Due Date</option>
      </select>
    </div>
  );
}
