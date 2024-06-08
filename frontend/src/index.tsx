import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Providers from "./components/providers";

import './index.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Providers>
        <Router>
          <App />
        </Router>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </Providers>
  </React.StrictMode>
);
