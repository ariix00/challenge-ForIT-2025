import { createContext, PropsWithChildren, useEffect, useState } from "react";

export interface TasksContextProps {
  api: string;
  taskList?: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
const TasksContext = createContext<TasksContextProps>({} as TasksContextProps);

const TasksProvider = ({ children }: PropsWithChildren) => {
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
    <TasksContext.Provider
      value={{
        api,
        taskList,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export { TasksProvider };
export default TasksContext;
