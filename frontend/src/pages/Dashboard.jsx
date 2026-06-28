import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import DashboardLayout from "../components/Layout/DashboardLayout";
import TaskCard from "../components/TaskCard/TaskCard";
import TaskCardSkeleton from "../components/TaskCard/TaskCardSkeleton";
import TaskForm from "../components/TaskForm/TaskForm";
import Modal from "../components/Modal/Modal";
import Button from "../components/Button/Button";
import { getTasks, deleteTask } from "../services/taskService";
import DashboardEmptyState from "../components/DashboardStates/DashboardEmptyState";
import DashboardSearchEmptyState from "../components/DashboardStates/DashboardSearchEmptyState";
import DashboardErrorState from "../components/DashboardStates/DashboardErrorState";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // Search, Filter, and Sort states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Compute displayedTasks using single pipeline
  const displayedTasks = useMemo(() => {
    let result = [...tasks];

    // 1. Search (Title & Description, case-insensitive)
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (task) =>
          (task.title && task.title.toLowerCase().includes(query)) ||
          (task.description && task.description.toLowerCase().includes(query))
      );
    }

    // 2. Status Filter
    if (statusFilter !== "all") {
      result = result.filter((task) => task.status === statusFilter);
    }

    // 3. Priority Filter
    if (priorityFilter !== "all") {
      result = result.filter((task) => task.priority === priorityFilter);
    }

    // 4. Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "oldest":
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case "due-nearest": {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        case "due-latest": {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(b.dueDate) - new Date(a.dueDate);
        }
        case "alpha-asc":
          return (a.title || "").localeCompare(b.title || "");
        case "alpha-desc":
          return (b.title || "").localeCompare(a.title || "");
        default:
          return 0;
      }
    });

    return result;
  }, [tasks, search, statusFilter, priorityFilter, sortBy]);

  const fetchTasks = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError("");

      const response = await getTasks();
      setTasks(response.data || []);
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message || "Failed to load tasks.",
      );
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreated = () => {
    fetchTasks(false);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleUpdated = () => {
    fetchTasks(false);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleCreateClick = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (task) => {
    setDeleteError("");
    setDeletingTask(task);
  };

  const handleCloseDeleteModal = () => {
    setDeletingTask(null);
    setDeleteLoading(false);
    setDeleteError("");
  };

  const handleConfirmDelete = async () => {
    if (!deletingTask) return;
    try {
      setDeleteLoading(true);
      setDeleteError("");
      await deleteTask(deletingTask._id);
      toast.success("Task deleted successfully");
      handleCloseDeleteModal();
      fetchTasks(false);
    } catch (requestError) {
      const errorMessage = requestError?.response?.data?.message || "Something went wrong.";
      setDeleteError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <DashboardLayout
        onCreateTask={handleCreateClick}
        tasks={tasks}
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        statusFilter={statusFilter}
        onStatusChange={(e) => setStatusFilter(e.target.value)}
        priorityFilter={priorityFilter}
        onPriorityChange={(e) => setPriorityFilter(e.target.value)}
        sortBy={sortBy}
        onSortChange={(e) => setSortBy(e.target.value)}
        loading={loading}
      >
        {loading ? (
          <section
            className="card"
            style={{
              display: "grid",
              gap: "1rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              }}
            >
              <TaskCardSkeleton />
              <TaskCardSkeleton />
              <TaskCardSkeleton />
            </div>
          </section>
        ) : error ? (
          <DashboardErrorState onRetry={() => fetchTasks(true)} />
        ) : tasks.length === 0 ? (
          <DashboardEmptyState onCreateTask={handleCreateClick} />
        ) : displayedTasks.length === 0 ? (
          <DashboardSearchEmptyState />
        ) : (
          <section
            className="card"
            style={{
              display: "grid",
              gap: "1rem",
            }}
          >
            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              }}
            >
              {displayedTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  priority={task.priority}
                  dueDate={task.dueDate}
                  onEdit={() => handleEdit(task)}
                  onDelete={() => handleDeleteClick(task)}
                />
              ))}
            </div>
          </section>
        )}
      </DashboardLayout>

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onCreated={handleCreated}
        onUpdated={handleUpdated}
        mode={editingTask ? "edit" : "create"}
        task={editingTask}
      />

      {deletingTask ? (
        <Modal title="Delete Task" onClose={handleCloseDeleteModal}>
          <div style={{ display: "grid", gap: "1rem" }}>
            <div>
              <p style={{ fontWeight: 500 }}>Are you sure you want to delete this task?</p>
              <p style={{ color: "var(--color-danger)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                This action cannot be undone.
              </p>
            </div>

            {deleteError ? (
              <div className="task-form__backend-error" role="alert">
                {deleteError}
              </div>
            ) : null}

            <div className="task-form__actions" style={{ marginTop: "0.5rem" }}>
              <Button
                variant="secondary"
                onClick={handleCloseDeleteModal}
                disabled={deleteLoading}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleConfirmDelete}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default Dashboard;
