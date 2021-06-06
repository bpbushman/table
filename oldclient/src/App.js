import { Route, Switch } from "react-router-dom";

import BrowseUsers from "./components/browse/browse.jsx";
import AuthRoute from "./util/auth-route/auth-route.jsx";
import AuthPage from "./pages/login-signup/authPage.jsx";
import HomePage from "./pages/home/homepage.jsx";
import Header from "./components/header/header.jsx";

const App = () => {

  return (
    <div>
      <Header />
      <Switch>
        <AuthRoute exact path="/" component={AuthPage} />
        <Route exact path="/newsfeed" component={HomePage} />
        <Route exact path="/browse" component={BrowseUsers}/>
      </Switch>
    </div>
  );
};

export default App;
