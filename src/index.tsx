import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, createStore } from 'logic/store';
import Authenticate from 'Components/utils/Authenticate';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import App from 'Components/App';

toast.configure();

const ContainRouter = () => {
  const store = createStore();

  return (
    <BrowserRouter>
      <Provider value={store}>
        <Authenticate Component={App} />
      </Provider>
    </BrowserRouter>
  );
};

ReactDOM.render(<ContainRouter />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
