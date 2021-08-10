import ThemeManager from "./themeManager"
import Footer from "./footer"
function Layout({children}) {
    return (
        <>
            <ThemeManager />
            <main className="flex m-0 p-0 items-center justify-center h-full">{children}</main>
            <Footer />
        </>
    )
}

export default Layout
