import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "./components/spinner/Spinner";
import NavBar from "./components/NavMenu/NavBar";
import Footer from "./components/Footer/Footer";
import { routes } from "./routes";

function App(props) {
  if (props.errorMessage) {
    toast.error(props.errorMessage);
  }
  if (props.successMessage) {
    toast(props.successMessage);
  }

  return (
    <div className="back">
      <NavBar />
      <Switch>
        {routes.map((m, index) => (
          <Route path={m.path} exact component={m.component} key={index} />
        ))}
        <Redirect to="/404" />
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

const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    loading: state.loading,
  };
};

export default connect(mapStateToProps)(App);
