import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Hike from "./pages/hike/Hike";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Admin from "./pages/admin/Admin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/hike">{<Hike />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/write"><Write /> </Route>
        <Route path="/edit/:postId"><Write /> </Route>
        <Route path="/register">{user ? <Register />:<Register />  }</Route>
        <Route path="/settings">{user ? <Settings /> : <Home/>}</Route>
        <Route path="/settings/:userId">{user ? <Settings /> : <Home/>}</Route>
        <Route path="/admin">{user ? <Admin /> : <Home/>}</Route>
        <Route path="/post/:postId"> <Single /> </Route>
        <Route path="/single"><Single /></Route>
      </Switch>
    </Router>
  );
}

export default App;
