import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Button from "../Button/Button";

function DashboardErrorState({ onRetry }) {
  return (
    <Card 
      className="dashboard-error-state" 
      style={{ 
        display: "grid", 
        placeItems: "center", 
        padding: "4rem 2rem", 
        textAlign: "center",
        boxShadow: "var(--shadow-sm)",
        borderColor: "rgba(239, 68, 68, 0.2)"
      }}
    >
      <CardContent 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          gap: "1.25rem", 
          padding: 0 
        }}
      >
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            width: "4.5rem", 
            height: "4.5rem", 
            borderRadius: "50%", 
            backgroundColor: "rgba(239, 68, 68, 0.08)", 
            color: "var(--color-danger)" 
          }}
        >
          <AlertCircle size={36} />
        </div>
        <div style={{ display: "grid", gap: "0.35rem" }}>
          <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Unable to load your tasks.
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "320px", margin: "0 auto" }}>
            There was a problem communicating with the server. Please try again.
          </p>
        </div>
        <Button 
          variant="danger" 
          onClick={onRetry} 
          style={{ marginTop: "0.5rem", padding: "0.75rem 1.5rem" }}
        >
          Retry
        </Button>
      </CardContent>
    </Card>
  );
}

export default DashboardErrorState;
