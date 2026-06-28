import "./Button.css";

function Button({
  children,
  variant = "secondary",
  className = "",
  type = "button",
  ...props
}) {
  const variantClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "danger"
        ? "btn-danger"
        : variant === "disabled"
          ? "btn-disabled"
          : "btn-secondary";

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
