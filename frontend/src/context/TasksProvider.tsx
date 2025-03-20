import { createContext, PropsWithChildren, useEffect, useState } from "react";

export interface TasksContextProps {
  api: string;
  results?: Task[];
  taskList: Task[] | undefined;
  filter: string;
  setTaskList: (x: Task[]) => void;
  setReloadFetch: (x: boolean) => void;
  handleFilterChange: (x: React.MouseEvent<HTMLButtonElement>) => void;
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
  const [reloadFetch, setReloadFetch] = useState<boolean>();
  const [filter, setFilter] = useState("");

  useEffect(() => {
    (async function () {
      try {
        const data = await fetch(api);
        const response = await data.json();
        console.log(response);
        setTaskList(response);
        setReloadFetch(false);
      } catch (error) {
        console.log("error fetching data: ", error);
      }
    })();
  }, [api, reloadFetch]);
  const handleFilterChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilter(event.currentTarget.value);
  };
  let results = [] as Task[];

  if (taskList) {
    if (filter === "false") {
      results = [...taskList.filter((x) => x.completed === false)];
    } else if (filter === "true") {
      results = [...taskList.filter((x) => x.completed === true)];
    } else {
      results = taskList;
    }
  }

  return (
    <TasksContext.Provider
      value={{
        results,
        api,
        filter,
        setTaskList,
        taskList,
        setReloadFetch,
        handleFilterChange,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export { TasksProvider };
export default TasksContext;
