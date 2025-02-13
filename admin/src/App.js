import "./App.css";
import { useState } from "react";

function App() {
  const [taskTitle, setTaskTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTask = async () => {
    const apiUrl = "https://crudapi.co.uk/api/v1/task";
    const apiKey = "5cHvC0XfvliDWRh8NRPoPR20hdvbOBOCuxShio-lH2TFSEVZbg";

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify([{ title: taskTitle, completed: false }]),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Task created:", data);
    } catch (error) {
      setError(error.message);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <button onClick={createTask} disabled={isLoading}>
        {isLoading ? "Creating..." : "Create Task"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
