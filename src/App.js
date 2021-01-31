import './App.css';
import ToDo from './toDoList/ToDoList'
import Grid from './grid'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ToDoList from './toDoList1/ToDoList'
import { Redirect, Route, Switch, Link, NavLink } from 'react-router-dom'
import Contacts from './toDoList1/pages/Contacts'
import SingleTask from './toDoList1/pages/SingleTask'
import About from './toDoList1/pages/About'
import NotFound from './toDoList1/pages/NotFound'
import NavBar from './toDoList1/NavMenu/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <ToDo /> */}
      <Switch>
        <Route path='/' exact component={ToDoList} />
        <Route path='/about' exact component={About} />
        <Route path='/task/:id' exact component={SingleTask} />
        <Route path='/contacts' exact component={Contacts} />
        <Route path='/404' exact component={NotFound} />
        <Redirect to='/404'/>
      </Switch>


      {/* <ToDoList /> */}


    </div>
  );
}

export default App;
