import { Skeleton } from "../ui/skeleton";
import "./TaskCard.css";

function TaskCardSkeleton() {
  return (
    <article className="task-card card">
      <div className="task-card__content">
        <div className="task-card__header">
          <Skeleton className="task-card__title" style={{ height: "1.4rem", width: "70%" }} />
          <div style={{ display: "grid", gap: "0.35rem", marginTop: "0.25rem" }}>
            <Skeleton style={{ height: "1rem", width: "100%" }} />
            <Skeleton style={{ height: "1rem", width: "85%" }} />
          </div>
        </div>

        <div className="task-card__meta">
          <Skeleton style={{ height: "22px", width: "75px", borderRadius: "100px" }} />
          <Skeleton style={{ height: "22px", width: "65px", borderRadius: "100px" }} />
        </div>

        <div className="task-card__due-date">
          <Skeleton style={{ height: "0.75rem", width: "50px" }} />
          <Skeleton style={{ height: "1.1rem", width: "100px", marginTop: "0.25rem" }} />
        </div>
      </div>

      <div className="task-card__actions">
        <Skeleton style={{ height: "38px", flex: "1 1 140px", borderRadius: "var(--radius-md)" }} />
        <Skeleton style={{ height: "38px", flex: "1 1 140px", borderRadius: "var(--radius-md)" }} />
      </div>
    </article>
  );
}

export default TaskCardSkeleton;
