import { useEffect, useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}
const TaskList = () => {
  const api = import.meta.env.VITE_API;
  const [taskList, setTaskList] = useState<Task[]>();
  useEffect(() => {
    (async function () {
      try {
        const data = await fetch(api);
        const response = await data.json();
        console.log(response);
        setTaskList(response);
      } catch (error) {
        console.log("error fetching data: ", error);
      }
    })();
  }, [api]);
  return (
    <div className="h-[750px] max-w-[600px] bg-zinc-500 flex flex-wrap p-5 gap-5">
      {taskList ? (
        taskList?.map((task) => {
          return (
            <>
              <div className="w-56 bg-slate-50 h-5">
                <h1>{task.title}</h1>
                <span>{task.description}</span>
              </div>
            </>
          );
        })
      ) : (
        <div>No hay tareas!</div>
      )}

      <div className="w-56 bg-slate-50 h-5 "></div>
    </div>
  );
};

export default TaskList;
