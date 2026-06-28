import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { useAuth } from "../context/AuthContext";
import "./LandingPage.css";

function SignupPlaceholder() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(name, email, password);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed. Try again.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      backgroundColor: "var(--background)",
      padding: "1.5rem",
      color: "var(--text-primary)"
    }}>
      <div style={{ width: "100%", maxWidth: "420px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        <Link to="/" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--text-secondary)",
          textDecoration: "none",
          fontSize: "0.9rem",
          fontWeight: 500,
          alignSelf: "flex-start"
        }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <Card style={{ padding: "2rem 1.5rem" }}>
          <CardHeader style={{ padding: "0 0 1.5rem 0", display: "grid", gap: "0.35rem" }}>
            <div style={{
              display: "grid",
              placeItems: "center",
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "var(--radius-sm)",
              background: "var(--color-primary)",
              color: "#ffffff",
              fontWeight: 800,
              fontSize: "0.95rem",
              marginBottom: "0.5rem"
            }}>TT</div>
            <CardTitle style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Create an Account</CardTitle>
            <CardDescription style={{ color: "var(--text-secondary)" }}>
              Get started with your free task tracking space.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent style={{ padding: 0, display: "grid", gap: "1rem" }}>
              <div style={{ display: "grid", gap: "0.35rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input"
                  style={{
                    width: "100%",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--background)",
                    padding: "0.75rem 1rem",
                    color: "var(--text-primary)"
                  }}
                />
              </div>

              <div style={{ display: "grid", gap: "0.35rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Email Address</label>
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input"
                  style={{
                    width: "100%",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--background)",
                    padding: "0.75rem 1rem",
                    color: "var(--text-primary)"
                  }}
                />
              </div>

              <div style={{ display: "grid", gap: "0.35rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Password</label>
                <input 
                  type="password" 
                  placeholder="•••••••• (Min 8 characters)" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input"
                  style={{
                    width: "100%",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--background)",
                    padding: "0.75rem 1rem",
                    color: "var(--text-primary)"
                  }}
                />
              </div>

              <div style={{ display: "grid", gap: "0.35rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Confirm Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="input"
                  style={{
                    width: "100%",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--background)",
                    padding: "0.75rem 1rem",
                    color: "var(--text-primary)"
                  }}
                />
              </div>
            </CardContent>

            <CardFooter style={{ padding: "1.5rem 0 0 0", display: "grid", gap: "1rem" }}>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn btn-primary" 
                style={{ width: "100%", textAlign: "center", justifyContent: "center", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle size={16} className="lucide-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <span>Sign Up</span>
                )}
              </button>
              
              <Separator style={{ margin: "0.5rem 0" }} />

              <div style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Already have an account? <Link to="/login" style={{ color: "var(--color-primary)", fontWeight: 600, textDecoration: "none" }}>Log In</Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default SignupPlaceholder;
