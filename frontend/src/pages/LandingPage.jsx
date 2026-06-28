import React from "react";
import { Link } from "react-router-dom";
import { 
  ClipboardList, 
  Search, 
  BarChart3, 
  Smartphone, 
  Moon, 
  Zap, 
  Plus, 
  CheckCircle2, 
  ArrowRight,
  Link2, 
  ExternalLink,
  Activity
} from "lucide-react";
import LandingNavbar from "../components/LandingNavbar/LandingNavbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import Badge from "../components/Badge/Badge";
import Button from "../components/Button/Button";
import { useAuth } from "../context/AuthContext";
import "./LandingPage.css";

function LandingPage() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="landing-page">
      <LandingNavbar />

      {/* Hero Section */}
      <header className="hero">
        <div className="hero__container">
          <div className="hero__badge-wrapper">
            <Badge variant="info">Introducing Task Tracker 2.0</Badge>
          </div>
          <h1 className="hero__title">Manage Your Tasks Smarter.</h1>
          <p className="hero__description">
            A premium MERN stack task management workspace built for speed, tracking, and organization. Organize your work, monitor your daily priorities, and hit your milestones smoothly.
          </p>
          <div className="hero__actions">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary hero__btn">
                Go to Dashboard <ArrowRight size={18} />
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary hero__btn">
                  Get Started <ArrowRight size={18} />
                </Link>
                <Link to="/dashboard" className="btn btn-secondary hero__btn">
                  View Dashboard
                </Link>
              </>
            )}
          </div>

          {/* App Preview Mockup */}
          <div className="hero__preview card">
            <div className="hero__preview-header">
              <div className="hero__preview-dots">
                <span className="dot dot--red"></span>
                <span className="dot dot--yellow"></span>
                <span className="dot dot--green"></span>
              </div>
              <div className="hero__preview-title">Task Tracker Workspace</div>
            </div>
            <div className="hero__preview-body">
              <div className="hero__preview-grid">
                <div className="preview-card">
                  <div className="preview-card__header">
                    <h4>Launch marketing campaign</h4>
                    <span className="preview-badge preview-badge--high">High</span>
                  </div>
                  <p>Coordinate social assets, set up email pipelines, and schedule product announcements.</p>
                  <div className="preview-card__footer">
                    <span>In Progress</span>
                    <span>Due: Oct 28, 2026</span>
                  </div>
                </div>

                <div className="preview-card">
                  <div className="preview-card__header">
                    <h4>Refactor database schemas</h4>
                    <span className="preview-badge preview-badge--medium">Medium</span>
                  </div>
                  <p>Optimize task query indexing and remove redundant field references for performance.</p>
                  <div className="preview-card__footer">
                    <span>Pending</span>
                    <span>Due: Nov 12, 2026</span>
                  </div>
                </div>

                <div className="preview-card">
                  <div className="preview-card__header">
                    <h4>Implement shadcn skeleton loader</h4>
                    <span className="preview-badge preview-badge--low">Low</span>
                  </div>
                  <p>Add pulsing loader cards to dashboard components to prevent client-side CLS shifts.</p>
                  <div className="preview-card__footer">
                    <span>Completed</span>
                    <span>Due: Oct 24, 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Designed for modern workflows.</h2>
            <p className="section-subtitle">
              Every tool you need to manage your personal backlogs, daily schedules, and project timelines.
            </p>
          </div>

          <div className="features-grid">
            <Card className="feature-card">
              <CardHeader>
                <div className="feature-icon feature-icon--total">
                  <ClipboardList size={22} />
                </div>
                <CardTitle>Task Management</CardTitle>
                <CardDescription>
                  Create, view, update, and delete tasks dynamically. Track descriptions, due dates, status, and priorities cleanly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <div className="feature-icon feature-icon--search">
                  <Search size={22} />
                </div>
                <CardTitle>Search & Filter</CardTitle>
                <CardDescription>
                  Find tasks instantly using fast search indexing. Filter by priority levels or status categories with zero lag.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <div className="feature-icon feature-icon--stats">
                  <BarChart3 size={22} />
                </div>
                <CardTitle>Smart Statistics</CardTitle>
                <CardDescription>
                  Get direct feedback on your productivity metrics. Monitor task ratios, high priorities, and pending counters at a glance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <div className="feature-icon feature-icon--mobile">
                  <Smartphone size={22} />
                </div>
                <CardTitle>Responsive Design</CardTitle>
                <CardDescription>
                  Optimized viewport scaling ensures a premium SaaS experience across phones, tablets, laptops, and large desktop screens.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <div className="feature-icon feature-icon--theme">
                  <Moon size={22} />
                </div>
                <CardTitle>Dark Mode Support</CardTitle>
                <CardDescription>
                  Switch smoothly between light and high-contrast monochrome dark themes, fully saving your preferences.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card">
              <CardHeader>
                <div className="feature-icon feature-icon--zap">
                  <Zap size={22} />
                </div>
                <CardTitle>Fast Performance</CardTitle>
                <CardDescription>
                  Bundled using Vite, featuring optimized local React states, and supported by a robust MongoDB database layer.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Get things done in 3 simple steps</h2>
            <p className="section-subtitle">Our optimized MERN architecture is built to stay out of your way.</p>
          </div>

          <div className="steps-container">
            <div className="step-block">
              <div className="step-number">1</div>
              <h3>Create Tasks</h3>
              <p>Add titles, set due dates, assign priority ranges, and write helpful task details in seconds.</p>
            </div>

            <div className="steps-divider-arrow">→</div>

            <div className="step-block">
              <div className="step-number">2</div>
              <h3>Track Progress</h3>
              <p>Update statuses between Pending, In Progress, and Completed as your execution pipeline progresses.</p>
            </div>

            <div className="steps-divider-arrow">→</div>

            <div className="step-block">
              <div className="step-number">3</div>
              <h3>Complete Goals</h3>
              <p>Wipe tasks off your board once done, keep statistics clean, and maintain maximum productivity.</p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Statistics Section */}
      <section id="statistics" className="statistics-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Built for interview-grade standards.</h2>
            <p className="section-subtitle">The Task Tracker is engineered with clean code and robust systems.</p>
          </div>

          <div className="statistics-grid">
            <div className="statistic-badge-card card-soft">
              <CheckCircle2 size={24} className="stat-check-icon" />
              <div>
                <h4>Full CRUD Operations</h4>
                <p>Add, edit, delete, and read tasks directly synced to MongoDB Atlas.</p>
              </div>
            </div>

            <div className="statistic-badge-card card-soft">
              <CheckCircle2 size={24} className="stat-check-icon" />
              <div>
                <h4>Interactive Filtering</h4>
                <p>Filter by Status and Priority instantly with zero layout shift.</p>
              </div>
            </div>

            <div className="statistic-badge-card card-soft">
              <CheckCircle2 size={24} className="stat-check-icon" />
              <div>
                <h4>Multi-Key Sorts</h4>
                <p>Sort tasks by creation date, deadline proximity, or alphabetically.</p>
              </div>
            </div>

            <div className="statistic-badge-card card-soft">
              <CheckCircle2 size={24} className="stat-check-icon" />
              <div>
                <h4>Monochrome Dark Mode</h4>
                <p>Modern black and white palette designed for developer ergonomics.</p>
              </div>
            </div>

            <div className="statistic-badge-card card-soft">
              <CheckCircle2 size={24} className="stat-check-icon" />
              <div>
                <h4>Pulsing Skeleton Loaders</h4>
                <p>Shadcn-styled skeletons prevent client CLS jumps on data loads.</p>
              </div>
            </div>

            <div className="statistic-badge-card card-soft">
              <CheckCircle2 size={24} className="stat-check-icon" />
              <div>
                <h4>Accessible UI Elements</h4>
                <p>Accessible buttons, form labels, focus rings, and Escape modal dismissals.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to boost your productivity?</h2>
          <p className="cta-description">
            Sign up for a free account today or try out our functional guest dashboard instantly.
          </p>
          <div className="cta-actions">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary cta-btn" style={{ width: "100%", maxWidth: "320px", justifyContent: "center" }}>
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary cta-btn">
                  Get Started
                </Link>
                <Link to="/dashboard" className="btn btn-secondary cta-btn">
                  View Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__logo-section">
            <div className="footer__logo">TT</div>
            <span className="footer__name">Task Tracker</span>
          </div>

          <div className="footer__links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" className="footer__link">
              <Link2 size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="footer__link">
              <ExternalLink size={20} />
            </a>
          </div>

          <div className="footer__copyright">
            &copy; {new Date().getFullYear()} Task Tracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
