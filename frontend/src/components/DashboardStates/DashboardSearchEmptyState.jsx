import { SearchX } from "lucide-react";
import { Card, CardContent } from "../ui/card";

function DashboardSearchEmptyState() {
  return (
    <Card 
      className="dashboard-search-empty-state" 
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
          <SearchX size={36} />
        </div>
        <div style={{ display: "grid", gap: "0.35rem" }}>
          <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--text-primary)" }}>
            No matching tasks found
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "320px", margin: "0 auto" }}>
            Try changing your search or filters.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardSearchEmptyState;
