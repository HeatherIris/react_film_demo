// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";   

const container = document.getElementById("root");
if (!container) throw new Error("#root element not found");

createRoot(container).render(
  // React 18 建议仍然包一层 StrictMode
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

