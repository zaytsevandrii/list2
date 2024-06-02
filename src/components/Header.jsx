import Button from "./Button"

const Header = ({ title, menuAdd, open }) => {
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button color={open ? "red" : "green"} text={open ? "Close" : "Add"} menuAdd={menuAdd} />
        </header>
    )
}

export default Header
