import * as React from "react";
import "./skeleton.css";

function Skeleton({ className = "", style, ...props }) {
  return (
    <div
      className={`shadcn-skeleton ${className}`.trim()}
      style={style}
      {...props}
    />
  );
}

export { Skeleton };
