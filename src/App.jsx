import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  // {
  //   id: 1,
  //   title: "Estudar Programação",
  //   description: "Estudar programação para ficar rico",
  //   isCompleted: false,
  // },
  // {
  //   id: 2,
  //   title: "Estudar Matemática",
  //   description: "Estudar Matemática para se tornar um Dev FullStack",
  //   isCompleted: false,
  // },
  // {
  //   id: 3,
  //   title: "Estudar Inglês",
  //   description: "Estudar inglês para se tornar fluente",
  //   isCompleted: false,
  // },

  //Função que pega as tarefas salvas no localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Função que recebe dados de uma api
  useEffect(() => {
    async function fetchTask() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      const data = await response.json();
      console.log(data);
      setTasks(data);
    }
    // fetchTask();
  }, []);

  //Função para completar a tarefa
  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (taskId == task.id) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      return task;
    });
    setTasks(newTasks);
  }

  //Função para deletar tarefa
  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id != taskId);

    setTasks(newTasks);
  }

  // Função para adicionar tarefa
  function onAddTaskSubmit(title, description) {
    const newtask = {
      id: tasks.length + 1,
      title: title,
      description: description,
      isCompleted: false,
    };
    setTasks([...tasks, newtask]);
  }

  console.log(tasks);
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>

        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
