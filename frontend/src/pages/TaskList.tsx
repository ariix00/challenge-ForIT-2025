import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TasksContext, { Task } from "../context/TasksProvider";
import { useContext, useEffect, useState } from "react";
import EditForm from "../components/EditForm";
import clsx from "clsx";

const TaskList = () => {
  const { filter, results, api, setReloadFetch, handleFilterChange } =
    useContext(TasksContext);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [taskToComplete, setTaskToComplete] = useState<Task | null>();
  const [completed, setCompleted] = useState<boolean>(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setOpenEditForm(true);
    console.log(taskToEdit);
  };

  const handleSubmit = () => {
    if (taskToDelete) {
      fetch(`${api}/${taskToDelete.id}`, {
        method: "DELETE",
      });
      setReloadFetch(true);
    }
  };
  const handleDelete = (task: Task) => {
    setTaskToDelete(task);
  };

  const handleCompleted = async () => {
    if (taskToComplete)
      try {
        console.log(taskToComplete.id);
        fetch(`${api}/completed/${taskToComplete.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: completed,
          }),
        });
        setReloadFetch(true);
        setTaskToComplete(null);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
  };

  const handleCheckboxChange =
    (task: Task) => (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("Task about to set: ", task);
      setCompleted(event.target.checked);
      setTaskToComplete(task);
      // console.log(task, completed);
    };

  useEffect(() => {
    if (taskToDelete) {
      handleSubmit();
      setTaskToDelete(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskToDelete]);
  useEffect(() => {
    if (taskToComplete !== null) {
      handleCompleted();
    }
  }, [taskToComplete, completed]);
  return (
    <div className="mt-10 max-h-[750px] overflow-y-scroll custom-scrollbar flex flex-col gap-5 justify-start align-center border-2 rounded-xl border-violet-400/50 p-5 text-xl text-center">
      <div className="flex gap-2 w-full bg-none text-violet-300">
        <button
          value={"false"}
          className={clsx(
            filter == "false"
              ? "p-2 bg-transparent border-2 border-violet-300 rounded-xl"
              : "p-2 bg-transparent border-2 border-zinc-600 rounded-xl"
          )}
          onClick={handleFilterChange}
        >
          Uncompleted
        </button>
        <button
          value={"true"}
          className={clsx(
            filter == "true"
              ? "p-2 bg-transparent border-2 border-violet-300 rounded-xl"
              : "p-2 bg-transparent border-2 border-zinc-600 rounded-xl"
          )}
          onClick={handleFilterChange}
        >
          Completed
        </button>
        <button
          value={""}
          className={clsx(
            filter == ""
              ? "p-2 bg-transparent border-2 border-violet-300 rounded-xl"
              : "p-2 bg-transparent border-2 border-zinc-600 rounded-xl"
          )}
          onClick={handleFilterChange}
        >
          All
        </button>
      </div>
      {results ? (
        results.length > 0 ? (
          results?.map((task) => {
            return (
              <>
                <div className="w-96 max-w-96 bg-zinc-800 h-fit p-5 rounded-xl flex items-center gap-5">
                  <input
                    checked={task.completed}
                    onChange={handleCheckboxChange(task)}
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
                      onClick={() => {
                        handleDelete(task);
                      }}
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
        )
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
