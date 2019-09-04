import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import App from './App/App.js'

function AppRouter() {
  return (
    <Router>
        <Route path="/" exact component={LoginPage} />
        <Route path="/app/" component={App} />
    </Router>
  );
}

export default AppRouter;
