import ThemeManager from "./themeManager"
import Nav from "./nav"

const Header = () => {
    return (
        <div className="h-12">
            <Nav />
            <ThemeManager />
        </div>
    )
}

export default Header
