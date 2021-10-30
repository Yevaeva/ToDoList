import Contacts from "./components/pages/Contacts/Contacts";
import NotFound from "./components/pages/NotFound";
import SingleTask from "./components/SingleTask/SingleTask";
import ToDoList from "./components/ToDo/ToDoList";
import About from "./components/pages/About/About";

export const routes = [
  {
    path: "/",
    component: ToDoList,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/task/:id",
    component: SingleTask,
  },
  {
    path: "/contacts",
    component: Contacts,
  },
  {
    path: "/404",
    component: NotFound,
  },
];
