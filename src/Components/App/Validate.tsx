import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { pathToRegexp } from 'path-to-regexp';
import { Redirect, useHistory } from 'react-router-dom';
// @logic
import { useStore } from 'logic/store';

const safeRoutes = [
  '/',
  '/about',
  '/contact', //TOOD: create contact page
  '/signin',
  '/signin/:nextRoute*',
  '/signup'
].map((path) => pathToRegexp(path));

const generalRoutes = [
  '/properties',
  '/profile',
  '/uploads',
  '/add-property' // TODO: to change routes based on application
  //  TODO to add more routes
].map((path) => pathToRegexp(path));

const PrivateRoute = observer(({ children }: any) => {
  const history = useHistory();
  const currentRoute = history.location.pathname;

  const store = useStore();
  const { userId, accessToken: token } = store.auth;

  const hasAccess = () => {
    if (safeRoutes.some((checkRoute) => checkRoute.test(currentRoute))) {
      if (currentRoute.includes('/signin') && userId) {
        history.push('/add-property');
      }
      return true;
    }

    if (generalRoutes.some((checkRoute) => checkRoute.test(currentRoute))) {
      if (userId != null && token != null) {
        return true;
      }
    }

    return false;
  };

  const canAccess = hasAccess();

  return canAccess ? (
    children
  ) : (
    <Redirect
      to={{
        pathname: `/signin${currentRoute || '/'}`,
        state: { from: history.location }
      }}
    />
  );
});

export default PrivateRoute;
