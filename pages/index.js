import Head from "next/head"
import Image from "next/image"

import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo"
import Logo from "../public/logo-beta.svg"
import Discord from "../public/discord.svg"
import Kofi from "../public/kofi.svg"

export default function Home() {
  return (
    <Layout>
      <Head>
        <SEO
        
          title="Home"
          description="The most comprehensive keyboard wikia for enthusiasts, cataloguing all kinds of switches, keycaps, keyboards, and more."
          keywords={['kb wiki', 'mechanical keyboard', 'mechanical keyboard wiki', 'keyboard wiki']}  

        />
      </Head>
      <section className="flex flex-col justify-center md:py-32 py-16">
        <h1 className="text-6xl">Welcome to the kb.wiki Beta</h1>
        <div className="border-l-8 border-solid rounded-bl-md my-2" style={{borderColor: "var(--primary-color)"}}>
          <p className="text-2xl p-2">A keyboard enthusiast&apos;s dream information hub</p>
        </div>
      </section>
      <section>
        <div className="border-l-8 border-solid rounded-md my-4 h-72 min-h-full" style={{borderColor: "var(--primary-color)", background: "var(--bg-accent)"}}>
          <div className="p-2">
            <h2 className="text-3xl">Keycap Sets</h2>
            {/* Insert keycaps here */}
          </div>
        </div>
      </section>
      <section>
        <div className="border-l-8 border-solid rounded-md my-4 h-72 min-h-full" style={{borderColor: "var(--primary-color)", background: "var(--bg-accent)"}}>
          <div className="p-2">
            <h2 className="text-3xl">Switches</h2>
            {/* Insert keycaps here */}
          </div>
        </div>
      </section>
      {/* <section className="flex items-center justify-center md:py-32 py-16 md:flex-row flex-col">
        <div className="w-80">
          <Image src={Logo} alt="Logo"/>
        </div>
        <div className="md:ml-8 mt-4">
          <h1 className="uppercase md:text-5xl md:mb-8 mb-4 tracking-wider md:text-left text-center">Coming Soon!</h1>
          <div className="border-l-8 border-solid rounded-l-md my-4" style={{borderColor: "var(--primary-color)", background: "var(--bg-accent)"}}>
            <p className="p-4">We&apos;re working hard on building this site.<br/>More details will be released soon.</p>
          </div>
          <a href="https://discord.gg/hM9BQ5mmsu" className="w-80 h-10 mt-16 flex justify-center rounded-full bg-purple-dark">
              <div className="w-10 pt-1 mr-10">
                <Image src={Discord}></Image>
              </div>
              <p className="uppercase text-white font-nunito-black pt-2 text-lg">Join us on Discord!</p>
          </a>
        </div>
      </section> */}
    </Layout>
  )
}
