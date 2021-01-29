import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider } from './hooks/theme'
import { AuthProvider } from './hooks/auth'

import App from './app';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

