import { ClipboardX } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Button from "../Button/Button";

function DashboardEmptyState({ onCreateTask }) {
  return (
    <Card 
      className="dashboard-empty-state" 
      style={{ 
        display: "grid", 
        placeItems: "center", 
        padding: "4rem 2rem", 
        textAlign: "center",
        boxShadow: "var(--shadow-sm)"
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
            backgroundColor: "rgba(107, 114, 128, 0.06)", 
            color: "var(--text-secondary)" 
          }}
        >
          <ClipboardX size={36} />
        </div>
        <div style={{ display: "grid", gap: "0.35rem" }}>
          <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)" }}>
            No tasks yet
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "320px", margin: "0 auto" }}>
            Create your first task to get started.
          </p>
        </div>
        <Button 
          variant="primary" 
          onClick={onCreateTask} 
          style={{ marginTop: "0.5rem", padding: "0.75rem 1.5rem" }}
        >
          Create Task
        </Button>
      </CardContent>
    </Card>
  );
}

export default DashboardEmptyState;
