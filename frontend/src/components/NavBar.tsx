import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="w-full py-5 flex justify-center font-bold">
      <div className="flex gap-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-violet-400 " : "text-zinc-500  hover:shadow-lg"
          }
        >
          Nueva tarea
        </NavLink>
        <NavLink
          to="/listaTareas"
          className={({ isActive }) =>
            isActive ? "text-violet-400 " : "text-zinc-500  hover:shadow-lg"
          }
        >
          Lista de tareas
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
