import React, { Component } from 'react';
import {
  Routes,
  BrowserRouter,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';
import Dashboard from './presentation/Dashboard';
import Login from './presentation/Login';
import './App.css';

function requireAuth(nextState, replace) {
  if (!localStorage.getItem("loggedUser")) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function RequireAuth({ children }) {
  let location = useLocation();

  if (!localStorage.getItem('loggedUser')) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
