import Head from "next/head"
import Image from "next/image"
import Layout from "../components/layout"
import Logo from "../public/logo.png"
import Discord from "../public/discord.svg"

export default function Home() {
  return (
    <Layout>
      <div className="flex items-center md:py-80 py-16 md:flex-row flex-col">
        <div className="w-64">
          <Image src={Logo} alt="Logo"/>
        </div>
        <div className="md:ml-8 mt-4">
          <h1 className="uppercase md:text-6xl md:mb-8 mb-4 tracking-wider md:text-left text-center">Coming Soon!</h1>
          <div className="border-l-8 border-solid rounded-md pl-4" style={{borderColor: "var(--primary-color)"}}>
            <p>We&apos;re working hard on building this site.</p>
            <p>More details will be released soon.</p>
          </div>
          <a href="https://discord.gg/hM9BQ5mmsu" className="w-80 h-10 mt-16 flex justify-center rounded-full bg-purple-dark">
              <div className="w-10 pt-1 mr-10">
                <Image src={Discord}></Image>
              </div>
              <p className="uppercase text-white font-nunito-black pt-2 text-lg">Join us on Discord!</p>
          </a>
        </div>
      </div>
    </Layout>
  )
}
