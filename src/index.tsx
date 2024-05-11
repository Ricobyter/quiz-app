import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple
