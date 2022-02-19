// The field component for all fields in forms in this module.
const InputField = ({ name, _ref, type, label }) => (
    <div className="auth-group">
        <label htmlFor={name}>{label}</label>
        <input required
            name={name}   
            ref={_ref}
            id={name}
            type={type}/>
    </div>
)
export default InputField