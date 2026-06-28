import "./Select.css";

function Select({ label, error, children, className = "", ...props }) {
  return (
    <label className="form-control">
      {label ? <span className="form-control__label">{label}</span> : null}
      <select className={`select ${className}`.trim()} {...props}>
        {children}
      </select>
      {error ? <span className="form-control__error">{error}</span> : null}
    </label>
  );
}

export default Select;
