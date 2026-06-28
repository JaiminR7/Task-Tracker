import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";
import LoginPlaceholder from "./pages/LoginPlaceholder";
import SignupPlaceholder from "./pages/SignupPlaceholder";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { useTheme } from "./context/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  const { theme } = useTheme();

  // Resolve "system" theme to actual "light" or "dark" for react-toastify
  const resolvedToastTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPlaceholder />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignupPlaceholder />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={resolvedToastTheme}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
