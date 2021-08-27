import Link from "next/link"
import Image from "next/image"

import Layout from "../components/layout/layout"
import {DATA} from "../components/dataFetch"

import SkeletonKeycapList from "../components/skeletons/skeletonKeycapList"

import Select from "react-select"
import {useQuery, useQueryClient} from "react-query"
import {useState} from "react"
import axios from "axios"

import selectTheme from "../styles/select"

const getKeycaps = async(key) => {
    const manuId = key.queryKey[1].manu
    if (manuId) {
        const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps?manufacturer.id=${manuId}`)
        /* const data = DATA(`keycaps?manufacturer.id=${manuId}`)
        We should be able to use DATA from dataFetch to do this.
        but it won't work for some reason. */
        // data logs as an object, of which data (data.data) contains our values.
        return data.data
    }
    const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps`)
    return data.data
}

function Keycaps ({keycaps, manufacturer}) {
    const queryClient = useQueryClient()

    keycaps = DATA("keycaps?_sort=name:DESC")
    manufacturer = DATA("keycap-manufacturers")

    const manufacturers = manufacturer.data
    const [manuId, setManuId] = useState(null)
    
    const {data, status} = useQuery(["keycaps", {manu: manuId}], getKeycaps, {initialData: keycaps.data})
    
    return (
        <Layout>
            <div className="2xl:w-2/3 w-4/5 py-16">
                <div className="flex flex-col">
                    <p className="font-nunito-black uppercase">Filters V</p>
                    <div className="flex flex-row">
                        <p className="mr-4">Manufacturer: </p>
                        <Select
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.id}
                            options={manufacturers}
                            instanceId="Types"
                            placeholder=""
                            isSearchable
                            isClearable
                            menuIsOpen
                            onChange={value => setManuId(value ? value.id : null)}
                            styles={selectTheme}
                        />
                    </div>
                </div>
                <div className="flex flex-row flex-wrap justify-center">
                    {status === "loading" && (
                        <SkeletonKeycapList />
                        /* status ==== "loading" never actually activates
                        Replace with keycaps.loading */
                    )}
                    {status === "error" && (
                        // This can call when we make getKeycaps use DATA from fetchData
                        <div>Error loading data, please try again later.</div>
                    )}

                    {!keycaps.loading && data.map((s) => (
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
                </div>
            </div>
        </Layout>
    )
}

export default Keycaps
