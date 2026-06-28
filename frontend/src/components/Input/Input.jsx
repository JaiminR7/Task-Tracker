import "./Input.css";

function Input({ label, error, className = "", as = "input", ...props }) {
  const FieldComponent = as;

  return (
    <label className="form-control">
      {label ? <span className="form-control__label">{label}</span> : null}
      <FieldComponent
        className={`${as === "textarea" ? "textarea" : "input"} ${className}`.trim()}
        {...props}
      />
      {error ? <span className="form-control__error">{error}</span> : null}
    </label>
  );
}

export default Input;
