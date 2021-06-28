import { Route, Switch } from "react-router-dom";

import AuthRoute from "./util/auth-route/auth-route.jsx";
import AuthPage from "./pages/login-signup/authPage.jsx";
import ProfilePage from "./pages/profile/profile-page.jsx";
import BrowseUsersPage from './pages/browse/browse-page.jsx';
import HomePage from "./pages/home/homepage.jsx";

const App = () => {

  return (
    <div>
      
      <Switch>
        <AuthRoute exact path="/" component={AuthPage} />
        <Route exact path="/newsfeed" component={HomePage} />
        <Route exact path="/browse" component={BrowseUsersPage} />
        <Route exact path="/profile" component={ProfilePage} />
      </Switch>
    </div>
  );
};

export default App;
