import * as React from "react";
import "./input.css";

const Input = React.forwardRef(({ className = "", type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={`shadcn-input ${className}`.trim()}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
