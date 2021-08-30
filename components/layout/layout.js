import Header from "./header"
import Footer from "./footer"
function Layout({children}) {
    return (
        <>
            <Header/>
                <main className="flex m-0 p-0 items-center justify-center h-full flex-col">
                    <div className="2xl:w-2/3 w-4/5 py-16">{children}</div>
                </main>
            <Footer />
        </>
    )
}

export default Layout
