import Image from "next/image"
import ValaIcon from "../../public/vala"

function Footer() {
    return (
        <div className="flex m-0 p-0 items-center justify-center h-full flex-col">
            <div className="2xl:w-4/5 w-5/6 py-16">
                <hr style={{borderColor: "var(--text-color)"}}></hr>
                <div className="flex py-4 items-center md:justify-end justify-center">
                    <div style={{fill: "var(--text-color)"}}>
                        <ValaIcon className="w-16 h-16"/>
                    </div>
                    <p>Brought to you by <a style={{color: "var(--tertiary-color"}} href="https://vala.supply">vala.supply</a></p>
                </div>
            </div>
        </div>
    )
}

export default Footer
