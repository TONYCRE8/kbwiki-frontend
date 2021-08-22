import Link from "next/link"

const Nav = () => {
    return (
        <div className="flex absolute justify-end right-16">
            <Link href="/">
                <a className="w-32 h-8 text-center mt-2">
                    <p className="font-nunito-black uppercase" style={{color: "var(--text-color)"}}>Home</p>
                </a>
            </Link>
            <Link href="/">
                <a className="w-32 h-8 text-center mt-2">
                    <p className="font-nunito-black uppercase" style={{color: "var(--text-color)"}}>Keycaps</p>
                </a>
            </Link>
            <Link href="/switches">
                <a className="w-32 h-8 text-center mt-2">
                    <p className="font-nunito-black uppercase" style={{color: "var(--text-color)"}}>Switches</p>
                </a>
            </Link>
            <Link href="/">
                <a className="w-32 h-8 text-center mt-2">
                    <p className="font-nunito-black uppercase" style={{color: "var(--text-color)"}}>Keyboards</p>
                </a>
            </Link>
            <Link href="/">
                <a className="w-32 h-8 text-center mt-2">
                    <p className="font-nunito-black uppercase" style={{color: "var(--text-color)"}}>Vendors</p>
                </a>
            </Link>
        </div>
    )
}

export default Nav
