import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskForm from "./pages/TaskForm";
import TaskList from "./pages/TaskList";
import NavBar from "./components/NavBar";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<TaskForm />}></Route>
        <Route path="/listaTareas" element={<TaskList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
