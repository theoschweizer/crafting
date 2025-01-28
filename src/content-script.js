// src/contentScript.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Sidebar } from './components/Sidebar'; // Import Sidebar component

alert('Content script loaded');

const script = document.createElement('script');
script.src = 'https://unpkg.com/react@18/umd/react.development.js'; // React 18
document.head.appendChild(script);

const scriptReactDOM = document.createElement('script');
scriptReactDOM.src = 'https://unpkg.com/react-dom@18/umd/react-dom.development.js'; // ReactDOM for React 18
document.head.appendChild(scriptReactDOM);

script.onload = scriptReactDOM.onload = () => {
  alert('React and ReactDOM loaded');
  const rootElement = document.createElement('div');
  document.body.appendChild(rootElement);

  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(Sidebar));
};
