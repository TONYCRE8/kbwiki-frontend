import {useState, useRef} from "react"
import Link from "next/link"
import {CgMenu} from "react-icons/cg"

import ThemeManager from "../themeManager"

const Nav = () => {
    const [toggled, setToggled] = useState(false)
    const nav = useRef(null)
    const NavToggle = () => {
        if (!toggled) {
            setToggled(!toggled)
        }
        else {
            setToggled(!toggled)
        }
    }
    return (
        <div className="flex absolute md:w-auto w-full justify-end md:right-8 right-4">
            <div className={`${toggled ? "flex z-20 right-0 fixed w-screen h-screen" : "hidden"}`} style={{background: "var(--bg-accent)"}}></div>
            <div className={`md:flex md:flex-row w-full z-50 md:flex-nowrap md:mr-16 md:mt-0 mt-16 ${toggled ? "flex flex-col justify-start" : "hidden"}`}>
                <ThemeManager />
                <Link href="/">
                    <a className="md:w-32 w-full md:h-8 h-16 text-center mt-2">
                        <p className="md:ml-0 ml-20 md:text-lg text-3xl md:mt-0 mt-4 font-nunito-black uppercase" style={{color: "var(--text-color)"}}>Home</p>
                    </a>
                </Link>
                <Link href="/keycaps">
                    <a className="md:w-32 w-full md:h-8 h-16 text-center mt-2">
                        <p className="md:ml-0 ml-20 md:text-lg text-3xl md:mt-0 mt-4 font-nunito-black uppercase" style={{color: "var(--text-color)"}}>Keycaps</p>
                    </a>
                </Link>
                <Link href="/switches">
                    <a className="md:w-32 w-full md:h-8 h-16 text-center mt-2">
                        <p className="md:ml-0 ml-20 md:text-lg text-3xl md:mt-0 mt-4 font-nunito-black uppercase" style={{color: "var(--text-color)"}}>Switches</p>
                    </a>
                </Link>
                <Link href="/">
                    <a className="md:w-32 w-full md:h-8 h-16 text-center mt-2">
                        <p className="md:ml-0 ml-20 md:text-lg text-3xl md:mt-0 mt-4 font-nunito-black uppercase" style={{color: "var(--text-color)"}}>Keyboards</p>
                    </a>
                </Link>
                <Link href="/">
                    <a className="md:w-32 w-full md:h-8 h-16 text-center mt-2">
                        <p className="md:ml-0 ml-20 md:text-lg text-3xl md:mt-0 mt-4 font-nunito-black uppercase" style={{color: "var(--text-color)"}}>Vendors</p>
                    </a>
                </Link>
            </div>
            <div onClick={NavToggle} ref={el => {el = nav}} className="md:hidden flex">
                <CgMenu className="text-6xl z-50 mt-2 -mr-4" style={{color: "var(--text-color)"}}/>
            </div>
        </div>
    )
}

export default Nav
