import Head from "next/head"
import Image from "next/image"
import Layout from "../components/layout"
import Logo from "../public/logo.svg"
import Discord from "../public/discord.svg"

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Keyboard Wiki Beta</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <meta name="description" content="The most comprehensive keyboard wikia for enthusiasts, cataloguing all kinds of switches, keycaps, keyboards, and more." />
        <meta name="keywords" content="mechanical keyboards, mk, wikipedia, keycaps, gmk, epbt, gateron, cherry, mx, switches" />
        <meta property="og:title" content="Keyboard Wiki Beta" key="facebook title" />
        <meta property="twitter:title" content="Keyboard Wiki Beta" key="twitter title" />
        <meta property="og:description" content="The most comprehensive keyboard wikia for enthusiasts, cataloguing all kinds of switches, keycaps, keyboards and more." />
        <meta property="twitter:description" content="The most comprehensive keyboard wikia for enthusiasts, cataloguing all kinds of switches, keycaps, keyboards and more." />
        <meta property="og:url" content="https://www.kb.wiki/" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="og:image" content="https://res.cloudinary.com/tonycre8/image/upload/v1628683211/banner_cro1jc.png" />
        <meta property="twitter:image" content="https://res.cloudinary.com/tonycre8/image/upload/v1628683211/banner_cro1jc.png" />
      </Head>
      <div className="flex items-center md:py-80 py-16 md:flex-row flex-col">
        <div className="w-80">
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
