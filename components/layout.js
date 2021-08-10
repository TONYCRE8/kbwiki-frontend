import ThemeManager from "./themeManager"
function Layout({children}) {
    return (
        <>
            <ThemeManager />
            <main>{children}</main>
        </>
    )
}

export default Layout
