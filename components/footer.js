import Image from "next/image"
import ValaIcon from "../public/vala"

function Footer() {
    return (
        <div className="my-0 mx-auto w-4/5">
            <hr style={{borderColor: "var(--text-color)"}}></hr>
            <div className="flex items-center md:justify-end justify-center">
                <div style={{fill: "var(--text-color)"}}>
                    <ValaIcon className="w-16 h-16"/>
                </div>
                <p>Brought to you by <a style={{color: "var(--tertiary-color"}} href="https://vala.supply">vala.supply</a></p>
            </div>
        </div>
    )
}

export default Footer
