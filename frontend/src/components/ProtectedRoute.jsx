import React, { useContext, useEffect, useRef } from "react"; 
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const toastShownRef = useRef(false);  // Ref to track if the toast has been shown

  useEffect(() => {
    if (!isAuthenticated && !toastShownRef.current) {
      toast.error("You need to login");  // Show error toast
      toastShownRef.current = true;  // Mark the toast as shown
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;  // Redirect to login if not authenticated
  }

  return children;  // Render protected content if authenticated
};

export default ProtectedRoute;
