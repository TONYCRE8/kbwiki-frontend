import Head from "next/head"
import Image from "next/image"

import Layout from "../components/layout/layout"
import SEO from "../components/layout/seo"
import Link from "next/link"
import { DATA } from "../lib/dataFetch"

import Logo from "../public/logo-beta.svg"
import Discord from "../public/discord.svg"
import Kofi from "../public/kofi.svg"

export default function Home() {

  const keycaps = DATA('keycaps?_sort=updatedAt%3Adesc&_limit=4').data;
  const switches = DATA('switches?_sort=updatedAt%3Adesc&_limit=4').data;
  
  const estLead = (data) => {
      var date = data.run_end
      var convertedDate = new Date(date)
      convertedDate.setMonth(convertedDate.getMonth()+data.manufacturer.lead)
      var formattedDate = convertedDate.toISOString().slice(0,7)
      var year = formattedDate.slice(0,4)
      var quarter = Math.round(formattedDate.slice(5,7) / 4) == 0 ? 1 : Math.round(formattedDate.slice(5,7) / 4)
      var newDate = year.concat(" Q", quarter)
      return newDate
  }

  return (
    <Layout>
      <SEO
        
        title="Home"
        description="The most comprehensive keyboard wikia for enthusiasts, cataloguing all kinds of switches, keycaps, keyboards, and more."
        keywords={['kb wiki', 'mechanical keyboard', 'mechanical keyboard wiki', 'keyboard wiki']}  

      />
      <section className="flex flex-col justify-center md:py-32 py-16">
        <h1 className="text-6xl">Welcome to the kb.wiki Beta</h1>
        <div className="border-l-8 border-solid rounded-bl-md my-2" style={{borderColor: "var(--primary-color)"}}>
          <p className="text-2xl p-2">A keyboard enthusiast&apos;s dream information hub</p>
        </div>
      </section>
      <hr></hr>
      <section>
        <div className="rounded-md my-4 h-72 min-h-full">
          <div className="p-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h2 className="font-nunito-black text-3xl">Keycap Sets</h2>
              </div>
              <Link href="/keycaps">
                <div className="w-40 rounded-lg p-2 font-nunito-black cursor-pointer text-center" style={{background: "var(--secondary-color)", color: "var(--bg-color)"}}>
                  View All Keycaps
                </div>
              </Link>
            </div>
            <div className="flex flex-row justify-between">
            {keycaps.map((s) => (
              <Link href={`/keycaps/${s.slug}`} key={s.id}>
                  <div className="w-72 2xl:m-4 lg:m-1 m-4 rounded-lg cursor-pointer shadow-lg transition transform duration-150 hover:-translate-y-1" style={{background: "var(--bg-accent)"}}>
                      <Image className="rounded-t-xl object-cover w-full" width={288} height={72} src={`${s.thumb.formats.small.url}`} />
                      <div className="text-left">
                          <h2 className="font-nunito-black text-xl leading-6 ml-1 py-1">{s.name}</h2>
                          <div className="border-l-8 rounded-bl-lg flex justify-between items-end" style={{borderColor: "var(--primary-color)"}}>
                              <p className="ml-2 py-2 text-sm leading-4 font-inter-regular capitalize">
                                  {s.manufacturer.name}<br />
                                  {s.profile.name} profile<br />
                                  {s.status.name}
                              </p>
                              <p className="items-end mr-2 pb-1 font-nunito-black" style={{color: "var(--secondary-color)"}}>{s.status.name == 'Manufacturing' || s.status.name == 'Group Buy' ? 'EST ' + estLead(s) : ''}</p>
                          </div>
                      </div>
                  </div>
              </Link>
            ))}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="rounded-md my-4 h-72 min-h-full">
          <div className="p-2">
            <div className="flex justify-between items-center">
              <h2 className="font-nunito-black text-3xl">Switches</h2>
              <Link href="/switches">
                <div className="w-40 rounded-lg p-2 font-nunito-black cursor-pointer text-center" style={{background: "var(--secondary-color)", color: "var(--bg-color)"}}>
                  View All Switches
                </div>
              </Link>
            </div>
            <div className="flex flex-row justify-between">
            {switches.map((s) => (
              <Link href={`/switches/${s.slug}`} key={s.slug} id={s.id}>
                  <div className="flex flex-row justify-between w-80 h-32 border-r-8 rounded-md cursor-pointer m-4 shadow-lg transition transform duration-150 hover:-translate-y-1" style={{borderColor: "var(--primary-color)"}}>
                      <Image className="rounded-lg object-cover" width={128} height={128} src={`${s.thumb.formats.medium.url}`} />
                      <div className="flex flex-col mx-4 text-right justify-between h-full pb-2">
                      <h2 className="text-2xl">{s.name}</h2>
                      <p className="font-inter-thin leading-4 capitalize">{s.type.name}<br/>
                      {s.manufacturer.name}<br/>
                      {s.actuation}g
                      </p>
                      </div>
                  </div>
              </Link>
            ))}
            </div>
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
