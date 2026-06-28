import "./TaskCard.css";
import Badge from "../Badge/Badge";
import Button from "../Button/Button";

const statusVariantMap = {
  Pending: "warning",
  "In Progress": "info",
  Completed: "success",
};

const priorityVariantMap = {
  Low: "default",
  Medium: "warning",
  High: "danger",
};

function formatDueDate(dueDate) {
  if (!dueDate) {
    return "No Due Date";
  }

  const parsedDate = new Date(dueDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return "No Due Date";
  }

  return parsedDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function TaskCard({
  title,
  description,
  status,
  priority,
  dueDate,
  onEdit,
  onDelete,
}) {
  const statusVariant = statusVariantMap[status] || "default";
  const priorityVariant = priorityVariantMap[priority] || "default";

  return (
    <article className="task-card card">
      <div className="task-card__content">
        <div className="task-card__header">
          <h3 className="task-card__title">{title}</h3>
          <p className="task-card__description">{description}</p>
        </div>

        <div className="task-card__meta">
          <Badge variant={statusVariant}>{status}</Badge>
          <Badge variant={priorityVariant}>{priority}</Badge>
        </div>

        <div className="task-card__due-date">
          <small>Due Date</small>
          <p>{formatDueDate(dueDate)}</p>
        </div>
      </div>

      <div className="task-card__actions">
        <Button variant="secondary" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </article>
  );
}

export default TaskCard;
