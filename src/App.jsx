import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Uthna", completed: false },
    { id: 2, text: "Sutna", completed: false },
    { id: 3, text: "Khana", completed: true },
    { id: 4, text: "Photo Khichna", completed: true },
  ]);

  const addTask = () => {
    const trimmed = taskInput.trim();
    if (trimmed && !tasks.some((t) => t.text === trimmed)) {
      const newTask = {
        id: Date.now(),
        text: trimmed,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskInput("");
    }
  };

  const toggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container-fluid app-bg min-vh-100">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 sidebar p-4 text-white d-flex flex-column">
          <h3 className="mb-4">
            <i className="bi bi-check2-square me-2"></i>Taskify
          </h3>
          <nav className="nav flex-column">
            <a className="nav-link text-white active" href="#">
              <i className="bi bi-house me-2"></i> Home
            </a>
            <a
              className="nav-link text-white"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Coming soon");
              }}
            >
              <i className="bi bi-clock-history me-2"></i> History
            </a>

            <a
              className="nav-link text-white"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert("Coming soon");
              }}
            >
              <i className="bi bi-gear me-2"></i> Settings
            </a>
          </nav>
          <div className="mt-auto medium font-monospace">© 2025 Taskify</div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4 text-white">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            <h3>Task List</h3>
            <div className="task-input-group d-flex align-items-center gap-2">
              <input
                type="text"
                className="form-control task-input ps-4 pe-4"
                placeholder="✍️ Add a new task..."
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
              />
              <button
                className="btn btn-primary add-btn d-flex align-items-center px-4 py-2"
                onClick={addTask}
              >
                Add
              </button>
            </div>
          </div>

          {/* Active Tasks */}
          <div className="section">
            <h5 className="text-info">Today's Tasks</h5>
            {tasks
              .filter((task) => !task.completed)
              .map((task) => (
                <div
                  key={task.id}
                  className="task-card active d-flex justify-content-between align-items-center"
                >
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={task.completed}
                      onChange={() => toggleCompletion(task.id)}
                    />
                    <span>{task.text}</span>
                  </div>
                </div>
              ))}
            {tasks.filter((t) => !t.completed).length === 0 && (
              <div className="text-muted"></div>
            )}
          </div>

          {/* Completed Tasks */}
          <div className="section mt-4">
            <h5 className="text-success">Completed Tasks</h5>
            {tasks
              .filter((task) => task.completed)
              .map((task) => (
                <div
                  key={task.id}
                  className="task-card completed d-flex justify-content-between align-items-center"
                >
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={task.completed}
                      onChange={() => toggleCompletion(task.id)}
                    />
                    <span className="text-decoration-line-through">
                      {task.text}
                    </span>
                  </div>
                  <button
                    className="btn btn-danger btn-sm rounded-pill"
                    onClick={() => deleteTask(task.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
