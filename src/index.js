import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
//LOGIN
import { Auth0Provider } from '@auth0/auth0-react';
//LOGIN
// const environment = "development";
import { Provider } from 'react-redux';
import store from './redux/store';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001"

//TODO LO DE LOGIN
const DOMAIN = "dev-pjw-u5xd.us.auth0.com"
const CLIENT_ID = "Pnl91k7Wp9B83IkO7BHziQgzZvhU4zv9"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={DOMAIN}
        clientId={CLIENT_ID}
        redirectUri={window.location.origin}
      //{`${window.location.origin}/home`}
      >
        <App />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);

