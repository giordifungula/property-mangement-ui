/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
// @logic
import { useStore } from 'logic/store';

export interface TemplateProps {
  Component: React.ElementType;
}

const Authenticate = ({ Component }: TemplateProps) => {
  const store = useStore();
  const [state, setState] = React.useState('');

  const authenticateUser = async () => {
    setState('loading');
    await store.auth.authenticate();
    setState('done');
  };

  React.useEffect(() => {
    authenticateUser();
  }, []);

  return state === 'loading' ? (
    <div style={{ textAlign: 'center', margin: '50px auto' }}>
      <button type="button" className="bg-indigo-500 ..." disabled>
        <svg className="animate-ping h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
          ...
          {/* TODO add proper loading spinner */}
        </svg>
        Loading...
      </button>
    </div>
  ) : state === 'done' ? (
    <Component />
  ) : (
    <div />
  );
};

export default Authenticate;
