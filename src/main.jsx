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
import ReactDOM from "react-dom/client";
import App from "./App";
// import "./styles.css";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
  onNeedRefresh() {
    console.log("New content available; please refresh.");
  },
  onOfflineReady() {
    console.log("App is ready to work offline.");
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
       <Toaster position="top-right" />
    </AuthProvider>
  </React.StrictMode>
);
