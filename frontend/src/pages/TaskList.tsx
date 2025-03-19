import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TasksContext, { Task } from "../context/TasksProvider";
import { useContext, useState } from "react";
import EditForm from "../components/EditForm";

const TaskList = () => {
  const { taskList } = useContext(TasksContext);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [openEditForm, setOpenEditForm] = useState(false);
  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setOpenEditForm(true);
    console.log(taskToEdit);
  };

  return (
    <div className="mt-10 max-h-[750px] flex flex-col gap-5 justify-start align-center border-2 rounded-xl border-violet-400/50 p-5 text-xl text-center">
      {taskList ? (
        taskList?.map((task) => {
          return (
            <>
              <div className="w-96 max-w-96 bg-zinc-800 h-fit p-5 rounded-xl flex items-center gap-5">
                <input
                  type="checkbox"
                  className="form-checkbox h-6 w-6 bg-none focus:bg-amber-50 checked:bg-amber-50 cursor-pointer"
                />
                <div className="flex flex-col justify-center flex-1">
                  <h1 className="text-2xl font-bold text-violet-300">
                    {" "}
                    {task.title}
                  </h1>
                  <span>{task.description}</span>
                </div>
                <div className="flex flex-col justify-center gap-5">
                  <FontAwesomeIcon
                    onClick={() => {
                      handleEdit(task);
                    }}
                    icon={faPenToSquare}
                    className="relative text-violet-400 hover:brightness-75 cursor-pointer duration-200"
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-violet-400 hover:brightness-75 cursor-pointer duration-200"
                  />
                </div>
              </div>
            </>
          );
        })
      ) : (
        <div>No hay tareas!</div>
      )}
      <EditForm
        openEditForm={openEditForm}
        setOpenEditForm={setOpenEditForm}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};

export default TaskList;
