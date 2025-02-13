import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { JobScraperProvider } from "./JobScraperContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <JobScraperProvider>
    <App />
  </JobScraperProvider>
);

