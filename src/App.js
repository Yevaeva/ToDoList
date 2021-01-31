import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ToDoList from './toDoList1/ToDoList'
import { Redirect, Route, Switch, Link, NavLink } from 'react-router-dom'
import Contacts from './toDoList1/pages/Contacts'
import SingleTask from './toDoList1/pages/SingleTask'
import About from './toDoList1/pages/About'
import NotFound from './toDoList1/pages/NotFound'
import NavBar from './toDoList1/NavMenu/NavBar';

function App() {

  const routes = [
    {
      path: '/',
      component: ToDoList
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/task/:id',
      component: SingleTask
    },
    {
      path: '/contacts',
      component: Contacts
    },
    {
      path: '/404',
      component: NotFound
    },
  ]
  return (
    <div className="App">
      <NavBar />
      {/* <ToDo /> */}
      <Switch>
        {
          routes.map((m, index) =>
            <Route
              path={m.path}
              exact
              component={m.component}
              key={index} />)
        }

        <Redirect to='/404' />
      </Switch>


      {/* <ToDoList /> */}


    </div>
  );
}

export default App;
