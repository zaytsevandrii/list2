const Button = ({ color, text, menuAdd }) => {
    return (
        <button style={{ backgroundColor: color }} className="btn" onClick={menuAdd}>
            {text}
        </button>
    )
}
//40 minutes
export default Button
