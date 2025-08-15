import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/auth" />;
  }

  return children; // Render the protected page if logged in
};

export default ProtectedRoute;
