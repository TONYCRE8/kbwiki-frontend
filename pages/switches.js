import {DATA} from "../components/dataFetch"
import Link from "next/link"
import Layout from "../components/layout/layout"
import Image from "next/image"
import SkeletonSwitchList from "../components/skeletons/skeletonSwitchList"

const Switches = () => {
    const switches = DATA("switches?_sort=name:DESC")
    return (
        <Layout>
          <div className="xl:w-2/5 w-2/3">
            <div className="flex flex-col">
              <p className="font-nunito-black uppercase">Filters V</p>
              <div>
                <p>Type:</p>
                <p>Manufacturer:</p>
                <p>Actuation:</p>
              </div>
            </div>
            <div className="flex flex-row justify-evenly">
              {switches.loaded && switches.data.map((s) => (
                <Link href={`/switches/${s.slug}`} key={s.slug} id={s.slug}>
                    <div className="flex flex-row justify-between w-80 h-28 border-r-8 rounded-md cursor-pointer mx-2" style={{borderColor: "var(--primary-color)"}}>
                      <Image className="rounded-lg" width={112} height={112} src={`${process.env.REACT_APP_STRAPI_API}${s.thumb.formats.thumbnail.url}`} />
                      <div className="flex flex-col mr-4 text-right justify-between h-full">
                        <h2 className="text-2xl">{s.name}</h2>
                        <p className="font-inter-thin leading-4 capitalize">{s.type}<br/>
                        {s.manufacturer}<br/>
                        {s.actuation}g
                        </p>
                      </div>
                    </div>
                </Link>
              ))}
            </div>
            {!switches.loaded && (
              <SkeletonSwitchList />
            )}
          </div>
        </Layout>
    )
}

export default Switches