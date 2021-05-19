import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "./Dashboard";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Header from "./Header";
import Contribute from "./Contribute";

const Routers = ({ signIn, signOut }) => {
  const user = useContext(UserContext);
  const checkLogin = (component) =>
    user.email ? component : <Redirect to="/" />;

  return (
    <Router>
      <Header signOut={signOut} />
      <Switch>
        <Route exact path="/">
          {user.email ? (
            <Redirect to="/dashboard" />
          ) : (
            <Login signIn={signIn} />
          )}
        </Route>
        <Route path="/dashboard">{checkLogin(<Dashboard />)}</Route>
        <Route path="/contribute">{checkLogin(<Contribute />)}</Route>
      </Switch>
    </Router>
  );
};

export default Routers;
