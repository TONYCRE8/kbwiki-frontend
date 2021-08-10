import ThemeManager from "./themeManager"
function Layout({children}) {
    return (
        <>
            <ThemeManager />
            <main className="flex m-0 p-0 items-center justify-center h-screen">{children}</main>
        </>
    )
}

export default Layout
