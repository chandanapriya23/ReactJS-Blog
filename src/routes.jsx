import { Router } from '@reach/router';
import RegisterView from './views/register_view';
import LoginView from './views/login_view';
import HomeView from "./views/home_view";

const Routes = () => (
  <Router>
    <RegisterView path="/register" />
    <LoginView path="/" />
    <HomeView path = "/home" />
  </Router>
);

export default Routes;