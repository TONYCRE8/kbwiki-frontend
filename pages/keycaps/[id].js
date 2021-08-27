import {useRouter} from 'next/router'
import Image from "next/image"
import { useRef, useState } from 'react'

import Layout from "../../components/layout/layout"
import { DATA } from "../../components/dataFetch"
import SkeletonKeycap from "../../components/skeletons/skeletonKeycap"

const id = () => {
    const router = useRouter()
    const { id } = router.query

    const keycaps = DATA(`keycaps?_slug=${id}`)

    console.log(keycaps)

    const [copied, setCopied] = useState(false)
    const urlCopy = useRef(null)

    const estLead = (data) => {
        var date = data.run_end
        var convertedDate = new Date(date)
        convertedDate.setMonth(convertedDate.getMonth()+data.manufacturer.lead)
        var formattedDate = convertedDate.toISOString().slice(0,7)
        var year = formattedDate.slice(0,4)
        var quarter = Math.round(formattedDate.slice(5,7) / 3)
        var newDate = year.concat(" Q", quarter)
        return newDate
    }

    const formatKits = (data) => {
        var kit = data.split("-")
        kit.splice(0,1)
        return kit
    }

    const copyURL = () => {
        const el = document.createElement("input")
        el.value = window.location.href
        document.body.appendChild(el)
        el.select()
        document.execCommand("copy")
        document.body.removeChild(el)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }
    return (
        <Layout>
            <div className="xl:w-3/5 w-2/3">
                {!keycaps.loading && keycaps.data.map((s) => (
                    <div className="flex flex-col py-16">
                        <div className="flex flex-row justify-between items-end">
                            <h1>{s.name}</h1>
                            <small>Last edited: {s.updatedAt.slice(0,10)}</small>
                        </div>
                        <hr></hr>
                        <div className="flex md:flex-row justify-center flex-col mt-8">
                            <div>
                                <Image className="rounded-lg md:w-1/2 w-full bg-white object-cover" width={500} height={240} src={`${process.env.REACT_APP_STRAPI_API}${s.thumb.formats.medium.url}`} />
                            </div>
                            <div className="md:w-1/2 md:max-w-md w-full md:ml-4">
                                <div className="rounded-lg p-4 mb-4" style={{background: "var(--bg-accent)"}}>
                                    <section className="mb-2">
                                        <h2 className="text-center text-lg tracking-wider">General Info</h2>
                                        <div className="flex flex-row justify-between">
                                            <p>Manufacturer:</p>
                                            <p className="font-inter-thin capitalize">{s.manufacturer.name}</p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p>Profile:</p>
                                            <p className="font-inter-thin capitalize">{s.profile.name}</p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p>Designer:</p>
                                            <p className="font-inter-thin capitalize">{s.designer}</p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p>Run:</p>
                                            <p className="font-inter-thin capitalize text-right">Start: {s.run_start.replace(/-/g, "/")}<br/>
                                            End: {s.run_end.replace(/-/g, "/")}
                                            </p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p>Status:</p>
                                            <p className="font-inter-thin capitalize">{s.status.name.replace("_", " ")}</p>
                                        </div>
                                        {s.status.name != "Completed" && (
                                            <div className="flex flex-row justify-between">
                                                <p>Estimated Completion:</p>
                                                <p className="font-inter-thin capitalize text-right">{estLead(s)}
                                                </p>
                                            </div>
                                        )}
                                    </section>
                                    <section className="mb-2">
                                        <h2 className="text-center text-lg tracking-wider">Available kits</h2>
                                        <ul className="font-inter-thin capitalize">{formatKits(s.kits).map((kit) => (
                                            <li>
                                                {kit}
                                            </li>
                                        ))}</ul>
                                    </section>
                                </div>
                                <section className="flex justify-between">
                                    <button onClick={copyURL} className="w-1/2 mr-2 h-8 uppercase rounded-xl font-nunito-black text-white" style={{background: "var(--primary-color)"}}>{!copied ? "Share" : "Copied"}</button>
                                    <button className="w-1/2 ml-2 h-8 uppercase rounded-xl font-nunito-black text-white" style={{background: "var(--secondary-color)"}}>Edit Article</button>
                                </section>
                            </div>
                        </div>
                    </div>
                ))}
                {keycaps.loading && (
                    <SkeletonKeycap />
                )}
            </div>
        </Layout>
    )
}

export default id
