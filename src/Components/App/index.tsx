import React from 'react';
import { Switch, withRouter, RouteComponentProps } from 'react-router-dom';
// components
import Home from 'Components/Home';
// Layouts
// Auth
// import Signin from 'Components/Auth/Signin';
// import Signup from 'Components/Auth/Signup';
import Validate from './Validate';
import WithLayout from 'Components/Layouts/WithLayout';
import Main from 'Components/Layouts/Main';
import Login from 'Components/Auth/Login';
import Signup from 'Components/Auth/Signup';
import About from 'Components/About';
import Contact from 'Components/Contact';
// import Documents from 'Components/Documents'; todo create uploads page
import Profile from 'Components/Profile';

const App = ({ location }: RouteComponentProps) => {
  return (
    <Validate>
      <Switch location={location}>
        <WithLayout exact path="/" layout={Main} component={Home} />
        <WithLayout path="/about" layout={Main} component={About} />
        <WithLayout path="/contact" layout={Main} component={Contact} />
        <WithLayout layout={Main} path="/signin" component={Login} />
        <WithLayout layout={Main} path="/signup" component={Signup} />
        <WithLayout layout={Main} path="/profile" component={Profile} />
      </Switch>
    </Validate>
  );
};

export default withRouter(App);
