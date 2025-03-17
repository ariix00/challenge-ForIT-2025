const TaskForm = () => {
  return (
    <form className="flex flex-col w-fit bg-zinc-800 p-5 box-border items-center rounded-xl gap-5 mt-10 text-slate-50 border-2 border-zinc-500/50">
      <h2 className="text-3xl py-3 font-black">Crear una tarea</h2>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label htmlFor="">Nombre</label>
          <input
            required
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
            name="decription"
            id=""
            placeholder="..."
            maxLength={90}
            className="rounded-lg border-2 border-zinc-500 p-1 w-96 resize-none h-fit focus:border-violet-500/50 outline-0"
          ></textarea>
        </div>
      </div>
      <button className="p-2 bg-violet-500 rounded-xl w-full font-bold hover:brightness-75 duration-200 cursor-pointer">
        CREAR TAREA
      </button>
    </form>
  );
};

export default TaskForm;
