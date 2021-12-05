import React from 'react';
import {
  Routes,
  BrowserRouter,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import Dashboard from './presentation/dashboard/Dashboard';
import Login from './presentation/login/Login';
import Users from './presentation/users/Users';
import UserProfile from './presentation/users/UserProfile';
import Courses from './presentation/courses/Courses';
import CourseProfile from './presentation/courses/CourseProfile';
import Transactions from './presentation/transactions/Transactions';
import Services from './presentation/services/Services';
import Layout from './presentation/Layout';
import './App.css';

function RequireAuth({ children }) {
  const location = useLocation();

  if (!localStorage.getItem('userId') || !localStorage.getItem('token')) {
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
            element={(
              <RequireAuth>
                <Layout>
                  <Dashboard />
                </Layout>
              </RequireAuth>
            )}
          />
          <Route
            path="/users"
            element={(
              <RequireAuth>
                <Layout>
                  <Users />
                </Layout>
              </RequireAuth>
            )}
          />
          <Route
            path="/users/:id"
            element={(
              <RequireAuth>
                <Layout>
                  <UserProfile />
                </Layout>
              </RequireAuth>
            )}
          />
          <Route
            path="/courses"
            element={(
              <RequireAuth>
                <Layout>
                  <Courses />
                </Layout>
              </RequireAuth>
            )}
          />
          <Route
            path="/courses/:id"
            element={(
              <RequireAuth>
                <Layout>
                  <CourseProfile />
                </Layout>
              </RequireAuth>
            )}
          />
          <Route
            path="/transactions"
            element={(
              <RequireAuth>
                <Layout>
                  <Transactions />
                </Layout>
              </RequireAuth>
            )}
          />
          <Route
            path="/services"
            element={(
              <RequireAuth>
                <Layout>
                  <Services />
                </Layout>
              </RequireAuth>
            )}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
