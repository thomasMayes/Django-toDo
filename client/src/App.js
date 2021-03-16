import { useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route} from "react-router-dom";

import { MyContext } from "./Provider";
import { Dashboard } from "./components/Dashboard";
import Login from "./components/Login";
import { Register } from "./components/new.register.jsx";
import { ProtectedRoute } from "./components/protected.route.jsx";
import { Profile } from "./components/Profile";

function App() {
  let { loadUser, isLoading } = useContext(MyContext);

  useEffect(() => {
    loadUser();
  }, [isLoading]);
  return (
    <div className="App" style={{ background: "#161616" }}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/profile" component={Profile} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
