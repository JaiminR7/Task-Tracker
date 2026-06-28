import "./DashboardLayout.css";
import Navbar from "../Navbar/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ClipboardList, CheckCircle2, Clock3, LoaderCircle, AlertTriangle } from "lucide-react";
import { Input } from "../ui/input";
import { Select } from "../ui/select";

function DashboardLayout({
  onCreateTask,
  tasks = [],
  search = "",
  onSearchChange,
  statusFilter = "all",
  onStatusChange,
  priorityFilter = "all",
  onPriorityChange,
  sortBy = "newest",
  onSortChange,
  children,
}) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;
  const highPriorityTasks = tasks.filter((t) => t.priority === "High").length;

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

          <button
            type="button"
            className="btn btn-primary dashboard-header__button"
            onClick={onCreateTask}
          >
            Create Task
          </button>
        </section>

        <section
          className="dashboard-stats"
          aria-label="Task statistics cards"
        >
          <Card>
            <CardHeader>
              <CardTitle>Total Tasks</CardTitle>
              <div className="stat-card__icon-wrapper stat-card__icon-wrapper--total">
                <ClipboardList size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <strong className="stat-card__value">{totalTasks}</strong>
              <small className="stat-card__description">All tasks in workspace</small>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed</CardTitle>
              <div className="stat-card__icon-wrapper stat-card__icon-wrapper--completed">
                <CheckCircle2 size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <strong className="stat-card__value">{completedTasks}</strong>
              <small className="stat-card__description">Finished tasks</small>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending</CardTitle>
              <div className="stat-card__icon-wrapper stat-card__icon-wrapper--pending">
                <Clock3 size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <strong className="stat-card__value">{pendingTasks}</strong>
              <small className="stat-card__description">Tasks waiting to start</small>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>In Progress</CardTitle>
              <div className="stat-card__icon-wrapper stat-card__icon-wrapper--progress">
                <LoaderCircle className="lucide-spin" size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <strong className="stat-card__value">{inProgressTasks}</strong>
              <small className="stat-card__description">Tasks currently active</small>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>High Priority</CardTitle>
              <div className="stat-card__icon-wrapper stat-card__icon-wrapper--high">
                <AlertTriangle size={18} />
              </div>
            </CardHeader>
            <CardContent>
              <strong className="stat-card__value">{highPriorityTasks}</strong>
              <small className="stat-card__description">Urgent priority items</small>
            </CardContent>
          </Card>
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
              <Input
                id="task-search"
                type="search"
                placeholder="Search tasks..."
                value={search}
                onChange={onSearchChange}
              />
            </div>

            <div className="field dashboard-filters__field">
              <label className="sr-only" htmlFor="status-filter">
                Filter by status
              </label>
              <Select
                id="status-filter"
                value={statusFilter}
                onChange={onStatusChange}
              >
                <option value="all">All</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </Select>
            </div>

            <div className="field dashboard-filters__field">
              <label className="sr-only" htmlFor="priority-filter">
                Filter by priority
              </label>
              <Select
                id="priority-filter"
                value={priorityFilter}
                onChange={onPriorityChange}
              >
                <option value="all">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </div>

            <div className="field dashboard-filters__field">
              <label className="sr-only" htmlFor="sort-tasks">
                Sort tasks
              </label>
              <Select
                id="sort-tasks"
                value={sortBy}
                onChange={onSortChange}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="due-nearest">Due Date (Nearest First)</option>
                <option value="due-latest">Due Date (Latest First)</option>
                <option value="alpha-asc">Alphabetical (A-Z)</option>
                <option value="alpha-desc">Alphabetical (Z-A)</option>
              </Select>
            </div>
          </div>
        </section>

        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
