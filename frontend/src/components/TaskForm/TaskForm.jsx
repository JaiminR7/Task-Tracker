import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./TaskForm.css";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import Select from "../Select/Select";
import { createTask, updateTask } from "../../services/taskService";

const initialFormState = {
  title: "",
  description: "",
  status: "Pending",
  priority: "Medium",
  dueDate: "",
};

function validateTaskForm(formData) {
  const nextErrors = {};

  if (!formData.title.trim()) {
    nextErrors.title = "Title is required.";
  } else if (formData.title.trim().length < 3) {
    nextErrors.title = "Title must be at least 3 characters.";
  } else if (formData.title.trim().length > 100) {
    nextErrors.title = "Title must not exceed 100 characters.";
  }

  if (formData.description.trim().length > 500) {
    nextErrors.description = "Description must not exceed 500 characters.";
  }

  return nextErrors;
}

function TaskForm({ isOpen, onClose, onCreated, onUpdated, mode = "create", task }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && task) {
        setFormData({
          title: task.title || "",
          description: task.description || "",
          status: task.status || "Pending",
          priority: task.priority || "Medium",
          dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "",
        });
      } else {
        setFormData(initialFormState);
      }
      setErrors({});
      setBackendError("");
    }
  }, [isOpen, mode, task]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setErrors({});
    setBackendError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateTaskForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      setBackendError("");

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate || undefined,
      };

      if (mode === "edit") {
        const response = await updateTask(task._id, payload);
        toast.success("Task updated successfully");
        if (onUpdated) {
          onUpdated(response.data);
        }
      } else {
        const response = await createTask(payload);
        toast.success("Task created successfully");
        if (onCreated) {
          onCreated(response.data);
        }
      }

      resetForm();
      onClose();
    } catch (requestError) {
      const errorMessage = requestError?.response?.data?.message || "Something went wrong.";
      setBackendError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  const isEditMode = mode === "edit";

  return (
    <Modal title={isEditMode ? "Edit Task" : "Create Task"} onClose={onClose}>
      <form className="task-form" onSubmit={handleSubmit} noValidate>
        <Input
          label="Title"
          name="title"
          type="text"
          placeholder="Enter task title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          maxLength={100}
        />

        <Input
          label="Description"
          name="description"
          as="textarea"
          type="text"
          placeholder="Enter task description"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          maxLength={500}
        />

        <div className="task-form__grid">
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Select>

          <Select
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
        </div>

        <Input
          label="Due Date"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
        />

        {backendError ? (
          <div className="task-form__backend-error" role="alert">
            {backendError}
          </div>
        ) : null}

        <div className="task-form__actions">
          <Button
            variant="secondary"
            type="button"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (isEditMode ? "Saving..." : "Creating...") : (isEditMode ? "Save Changes" : "Create Task")}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default TaskForm;
