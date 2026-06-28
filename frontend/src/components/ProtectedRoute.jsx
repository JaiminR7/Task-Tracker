import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        backgroundColor: "var(--background)",
        color: "var(--text-primary)"
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Restoring session...</h3>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
