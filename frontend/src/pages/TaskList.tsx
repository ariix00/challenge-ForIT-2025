import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TasksContext from "../context/tasksProvider";
import { useContext } from "react";

const TaskList = () => {
  const { taskList } = useContext(TasksContext);

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
                    icon={faPenToSquare}
                    className="text-violet-400 hover:brightness-75 cursor-pointer duration-200"
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
    </div>
  );
};

export default TaskList;
