import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ToDoList from './components/ToDo/ToDoList'
import { Redirect, Route, Switch } from 'react-router-dom'
import Contacts from './components/pages/Contacts/Contacts'
import About from './components/pages/About'
import NotFound from './components/pages/NotFound'
import { connect } from 'react-redux';
import Spinner from './components/spinner/Spinner';
import NavBar from './components/NavMenu/NavBar';
import SingleTask from './components/SingleTask';
import Footer from './components/Footer/Footer';


function App(props) {
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

  if(props.errorMessage){
    toast.error(props.errorMessage)
  }
  if(props.successMessage){
    toast(props.successMessage)
  }
  
  return (
    
    <div className='back'>
      <NavBar />
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
      <Footer />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    {props.loading && <Spinner />}

    </div>

   
  
  );
}

const mapStateToProps = (state) =>{
  return {
    errorMessage:state.errorMessage,
    successMessage:state.successMessage,
    loading:state.loading
  }
}

export default connect(mapStateToProps)(App);
