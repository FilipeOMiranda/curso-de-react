import { useState } from "react";
import Input from "./input";

function AddTask(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  console.log(props);

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <Input
        type="text"
        placeholder="Digite o título da tarefa"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Input
        type="text"
        placeholder="Digite a descrição da tarefa"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <button
        onClick={() => {
          //Verificar se os campos estão vazios
          if (!title.trim() || !description.trim()) {
            alert("Preencha o título e a descrição da tarefa!");
          } else {
            props.onAddTaskSubmit(title, description);
            setTitle("");
            setDescription("");
          }
        }}
        className="bg-slate-500 text-white px4 py-2 rounded-md"
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
