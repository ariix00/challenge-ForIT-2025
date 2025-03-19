import { useContext, useState } from "react";
import TasksContext from "../context/tasksProvider";

const TaskForm = () => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const { api } = useContext(TasksContext);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, description: description }),
    });
    window.location.reload();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-fit bg-zinc-800 p-5 box-border items-center rounded-xl gap-5 mt-10 text-slate-50 border-2 border-zinc-500/50"
    >
      <h2 className="text-3xl py-3 font-black">Crear una tarea</h2>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="">Nombre</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="..."
            name="title"
            className="rounded-lg border-2 border-zinc-500 p-1 w-96 focus:border-violet-500/50 outline-0"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Descripción</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="decription"
            id=""
            placeholder="..."
            maxLength={90}
            className="rounded-lg border-2 border-zinc-500 p-1 w-96 resize-none h-fit focus:border-violet-500/50 outline-0"
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        className="p-2 bg-violet-500 rounded-xl w-full font-bold hover:brightness-75 duration-200 cursor-pointer"
      >
        CREAR TAREA
      </button>
    </form>
  );
};

export default TaskForm;
