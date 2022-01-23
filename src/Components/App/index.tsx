import React from 'react';
import { Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import Validate from './Validate';
// Layouts
import WithLayout from 'Components/Layouts/WithLayout';
// components
import Home from 'Components/Home';
import Main from 'Components/Layouts/Main';
import About from 'Components/About';
import Contact from 'Components/Contact';
import Profile from 'Components/Profile';
// Auth
import Login from 'Components/Auth/Login';
import Signup from 'Components/Auth/Signup';
import AddProperty from 'Components/AddProperty';
import Properties from 'Components/Properties';

const App = ({ location }: RouteComponentProps) => {
  return (
    <Validate>
      <Switch location={location}>
        <WithLayout exact path="/" layout={Main} component={Home} />
        <WithLayout path="/about" layout={Main} component={About} />
        <WithLayout path="/contact" layout={Main} component={Contact} />
        <WithLayout
          path="/add-property"
          layout={Main}
          component={AddProperty}
        />
        <WithLayout path="/properties" layout={Main} component={Properties} />
        <WithLayout layout={Main} path="/signin" component={Login} />
        <WithLayout layout={Main} path="/signup" component={Signup} />
        <WithLayout layout={Main} path="/profile" component={Profile} />
      </Switch>
    </Validate>
  );
};

export default withRouter(App);
