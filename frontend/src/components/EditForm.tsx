import React, { useContext, useState } from "react";
import TasksContext, { Task } from "../context/TasksProvider";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
interface EditFormProps {
  taskToEdit: Task | null;
  openEditForm: boolean;
  setOpenEditForm: (x: boolean) => void;
}

const EditForm = ({
  taskToEdit,
  openEditForm,
  setOpenEditForm,
}: EditFormProps) => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const { api } = useContext(TasksContext);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    fetch(`${api}/${taskToEdit?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });
    setOpenEditForm(false);
    window.location.reload();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        openEditForm == false
          ? "hidden"
          : "flex fixed top-1/3 transform -translate-x-1/2 -translate-y-1/2 left-4/5 z-50 flex-col w-fit bg-zinc-800 p-5 box-border items-center rounded-xl gap-5 mt-10 text-slate-50 border-2 border-zinc-500/50"
      )}
    >
      <FontAwesomeIcon
        icon={faXmark}
        onClick={() => {
          setOpenEditForm(false);
        }}
        className="absolute -right-5 -top-5 text-violet-300 text-xl"
      />
      <h2 className="text-3xl py-3 font-black">Editar tarea</h2>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="">Nombre</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder={taskToEdit?.title}
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
            placeholder={taskToEdit?.description}
            maxLength={90}
            className="rounded-lg border-2 border-zinc-500 p-1 w-96 resize-none h-fit focus:border-violet-500/50 outline-0"
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        className="p-2 bg-violet-500 rounded-xl w-full font-bold hover:brightness-75 duration-200 cursor-pointer"
      >
        EDITAR TAREA
      </button>
    </form>
  );
};

export default EditForm;
