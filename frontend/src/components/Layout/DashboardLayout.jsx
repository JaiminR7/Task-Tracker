import './DashboardLayout.css';
import Navbar from '../Navbar/Navbar';

function DashboardLayout() {
  return (
    <div className="dashboard-shell">
      <Navbar />

      <main className="dashboard-main">
        <section className="dashboard-header card">
          <div>
            <p className="dashboard-header__eyebrow">Overview</p>
            <h2>Task Tracker Dashboard</h2>
            <p>Welcome back. Your workspace is ready for task management.</p>
          </div>

          <button type="button" className="btn btn-primary dashboard-header__button">
            Create Task
          </button>
        </section>

        <section className="dashboard-stats" aria-label="Task statistics placeholders">
          <article className="card card-soft stat-card">
            <small>Total Tasks</small>
            <strong>--</strong>
          </article>
          <article className="card card-soft stat-card">
            <small>Completed</small>
            <strong>--</strong>
          </article>
          <article className="card card-soft stat-card">
            <small>Pending</small>
            <strong>--</strong>
          </article>
          <article className="card card-soft stat-card">
            <small>In Progress</small>
            <strong>--</strong>
          </article>
        </section>

        <section className="dashboard-panel card">
          <div className="dashboard-panel__header">
            <div>
              <p className="dashboard-panel__eyebrow">Filters</p>
              <h3>Search & Filter</h3>
            </div>
          </div>

          <div className="dashboard-filters">
            <div className="field dashboard-filters__field dashboard-filters__search">
              <label className="sr-only" htmlFor="task-search">
                Search tasks
              </label>
              <input
                id="task-search"
                className="input"
                type="search"
                placeholder="Search tasks..."
                disabled
              />
            </div>

            <div className="field dashboard-filters__field">
              <label className="sr-only" htmlFor="status-filter">
                Filter by status
              </label>
              <select id="status-filter" className="select" disabled defaultValue="all">
                <option value="all">All Status</option>
              </select>
            </div>

            <div className="field dashboard-filters__field">
              <label className="sr-only" htmlFor="priority-filter">
                Filter by priority
              </label>
              <select id="priority-filter" className="select" disabled defaultValue="all">
                <option value="all">All Priority</option>
              </select>
            </div>

            <div className="field dashboard-filters__field">
              <label className="sr-only" htmlFor="sort-tasks">
                Sort tasks
              </label>
              <select id="sort-tasks" className="select" disabled defaultValue="recent">
                <option value="recent">Newest First</option>
              </select>
            </div>
          </div>
        </section>

        <section className="dashboard-panel card task-list-placeholder" aria-label="Task list placeholder">
          <p>Tasks will appear here.</p>
        </section>
      </main>
    </div>
  );
}

export default DashboardLayout;