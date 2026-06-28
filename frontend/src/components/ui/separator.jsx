import * as React from "react";
import "./separator.css";

const Separator = React.forwardRef(
  (
    { className = "", orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={`shadcn-separator shadcn-separator--${orientation} ${className}`.trim()}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

export { Separator };
