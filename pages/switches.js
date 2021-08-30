import {DATA} from "../components/dataFetch"
import Link from "next/link"
import Layout from "../components/layout/layout"
import Image from "next/image"
import SkeletonSwitchList from "../components/skeletons/skeletonSwitchList"

const Switches = () => {
    const switches = DATA("switches?_sort=name:DESC")
    console.log(switches)
    return (
        <Layout>
          <div className="flex flex-col">
            <p className="font-nunito-black uppercase">Filters V</p>
            {/* <Filter /> */}
          </div>
          <div className="flex flex-row flex-wrap justify-center">
            {!switches.loading && switches.data.map((s) => (
              <Link href={`/switches/${s.slug}`} key={s.slug} id={s.id}>
                  <div className="flex flex-row justify-between w-80 h-28 border-r-8 rounded-md cursor-pointer m-4 shadow-lg transition transform duration-150 hover:-translate-y-1" style={{borderColor: "var(--primary-color)"}}>
                    <Image className="rounded-lg" width={112} height={112} src={`${process.env.REACT_APP_STRAPI_API}${s.thumb.formats.thumbnail.url}`} />
                    <div className="flex flex-col mr-4 text-right justify-between h-full pb-2">
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
          {switches.loading && (
            <SkeletonSwitchList />
          )}
        </Layout>
    )
}

export default Switches