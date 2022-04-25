import Nav from "./nav"
import Image from "next/image"
import Logo from "../../public/logo-beta.svg"

const Header = () => {
    return (
        <div className="flex flex-row md:h-12">
            <div className="mt-2 lg:ml-8">
                <Image src={Logo} height={72} width={72} />
            </div>
            <Nav />
        </div>
    )
}

export default Header
