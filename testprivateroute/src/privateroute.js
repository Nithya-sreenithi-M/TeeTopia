import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element: Component, ...rest }) {
  const isAuthenticated = // check if user is authenticated
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
}