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
      <section className="flex items-center justify-center md:py-32 py-16 md:flex-row flex-col">
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
      </section>
      <hr className="my-16" style={{borderColor: "var(--text-color)"}}></hr>
      <section className="flex flex-col">
      </section>
      <hr className="my-16" style={{borderColor: "var(--text-color)"}}></hr>
      <section className="flex flex-col">
        <h2 className="text-4xl md:text-left text-center mb-4">What can I expect to see?</h2>
        <div className="md:mx-8">
          <p>The beta will contain a selection of data collected over the months. In this we will aim to provide the following:</p>
          <div className="border-l-8 border-solid rounded-l-md my-4" style={{borderColor: "var(--primary-color)", background: "var(--bg-accent)"}}>
            <ul className="p-4">
              <li className="mb-2">Data on Switches, from manufacturers like Kalih, Gateron, Cherry, ThicThock and more.</li>
              <li className="mb-2">Data on Keycap sets, from manufacturers like GMK, JTK, ePBT, and more.</li>
              <li>The ability to search and filter by parameters such as color, type, profile, actuation, and more.</li>
            </ul>
          </div>
          <p>After the beta has been out for a while and public reception has been gained, we will decide on whether there&apos;s enough support for the full version.<br />
          In said full version, you can expect to see:</p>
          <div className="border-l-8 border-solid rounded-l-md my-4" style={{borderColor: "var(--primary-color)", background: "var(--bg-accent)"}}>
            <ul className="p-4">
              <li className="mb-2">Data on keyboards, vendors by region (including UK/EU seperation).</li>
              <li className="mb-2">User accounts where you can submit page edits online (as opposed to edit requests on the Discord server).</li>
              <li>A bunch of other stuff too!</li>
            </ul>
          </div>
        </div>
      </section>
      <hr className="my-16" style={{borderColor: "var(--text-color)"}}></hr>
      <section className="flex flex-col mb-8 justify-center items-center">
        <h2 className="text-4xl text-center mb-4">What can you do?</h2>
        <p className="text-center md:w-3/4">
          There&apos;s a bunch to be done. The best thing you can do is show your support! Join our Discord server, donate to the Ko-Fi if at all possible, and spread word about the project!
        </p>
        <p className="text-center md:w-3/4">
          You can also help on the Discord server by filling in some of the gaps in our database when the beta is out.
        </p>
        <div className="flex md:flex-row flex-col md:my-8 my-4 mb-8 justify-evenly items-center w-full">
          <a href="https://discord.gg/hM9BQ5mmsu" className="md:my-0 my-2 w-80 h-10 flex justify-center rounded-full bg-purple-dark">
              <div className="w-10 pt-1 mr-10">
                <Image src={Discord}></Image>
              </div>
              <p className="uppercase text-white font-nunito-black pt-2 text-lg">Join us on Discord!</p>
          </a>
          <a href="https://ko-fi.com/kbwiki" className="md:my-0 my-2 w-80 h-10 flex justify-center rounded-full bg-green-dark">
              <div className="w-10 mr-10">
                <Image src={Kofi}></Image>
              </div>
              <p className="uppercase text-white font-nunito-black pt-2 text-lg">Support us on Kofi!</p>
          </a>
        </div>
      </section>
    </Layout>
  )
}
