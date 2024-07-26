import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const apiUrl = "https://crudapi.co.uk/api/v1/task";
      const apiKey = "5cHvC0XfvliDWRh8NRPoPR20hdvbOBOCuxShio-lH2TFSEVZbg";

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        setError(error.message);
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);
  console.log(tasks.items);
  if (isLoading) return "loading";
  if (tasks.items && Array.isArray(tasks.items)) {
    return (
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {tasks.items.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
