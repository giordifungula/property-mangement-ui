import * as React from 'react';
import { Route } from 'react-router-dom';

interface Props {
  component: React.ElementType;
  layout: React.ElementType;
  path: string;
  exact?: boolean;
  layoutProps?: Record<string, unknown>;
}

const AppRoute = ({
  component: Component,
  layout: Layout,
  layoutProps,
  ...rest
}: Props) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout {...layoutProps}>
        <Component {...props} />
      </Layout>
    )}
  />
);

export default AppRoute;
