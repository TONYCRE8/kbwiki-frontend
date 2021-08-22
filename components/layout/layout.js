import Header from "./header"
import Footer from "./footer"
function Layout({children}) {
    return (
        <>
            <Header/>
            <main className="flex m-0 p-0 items-center justify-center h-full flex-col">{children}</main>
            <Footer />
        </>
    )
}

export default Layout
