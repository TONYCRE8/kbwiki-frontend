import Link from "next/link"
import Image from "next/image"

import Layout from "../components/layout/layout"
import {DATA} from "../components/dataFetch"

import SkeletonKeycapList from "../components/skeletons/skeletonKeycapList"

function Keycaps() {
    const sets = DATA("keycaps?_sort=name:DESC")
    console.log(sets)
    return (
        <Layout>
            <div className="2xl:w-2/3 w-4/5 py-16">
                <div className="flex flex-col">
                    <p className="font-nunito-black uppercase">Filters V</p>
                    <div>
                        
                    </div>
                </div>
                <div className="flex flex-row flex-wrap justify-center">
                    {sets.loaded && sets.data.map((s) => (
                        <Link href={`/keycaps/${s.slug}`} key={s.id}>
                            <div className="w-72 m-4 cursor-pointer shadow-lg transition transform duration-150 hover:-translate-y-1">
                                <Image className="rounded-t-3xl object-cover w-full" width={288} height={72} src={`${process.env.REACT_APP_STRAPI_API}${s.thumb.formats.small.url}`} />
                                <div className="text-right">
                                    <h2 className="font-nunito-black text-2xl leading-6">{s.name}</h2>
                                    <div className="border-r-8 rounded-br-lg" style={{borderColor: "var(--primary-color)"}}>
                                        <p className="mr-4 pb-2 text-sm leading-4 font-inter-thin capitalize">
                                            {s.manufacturer.name}<br />
                                            {s.profile.name} profile<br />
                                            {s.status.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {!sets.loaded && (
                        <SkeletonKeycapList />
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Keycaps
