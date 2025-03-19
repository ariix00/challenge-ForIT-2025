import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskForm from "./pages/TaskForm";
import TaskList from "./pages/TaskList";
import NavBar from "./components/NavBar";
import { TasksProvider } from "./context/tasksProvider";
function App() {
  return (
    <TasksProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<TaskForm />}></Route>
          <Route path="/listaTareas" element={<TaskList />}></Route>
        </Routes>
      </Router>
    </TasksProvider>
  );
}

export default App;
