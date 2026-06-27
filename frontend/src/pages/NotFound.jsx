import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "#f7f7fb",
        color: "#111827",
        textAlign: "center",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <section>
        <p style={{ margin: 0, fontSize: "3rem", fontWeight: 800 }}>404</p>
        <h1 style={{ margin: "12px 0 8px", fontSize: "2rem" }}>
          Page Not Found
        </h1>
        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            marginTop: "16px",
            border: "none",
            borderRadius: "999px",
            padding: "12px 20px",
            background: "#2563eb",
            color: "#ffffff",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          Go Back Home
        </button>
      </section>
    </main>
  );
}

export default NotFound;
