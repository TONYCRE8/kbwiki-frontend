import Head from "next/head"
import Image from "next/image"
import {useRouter} from 'next/router'
import React, { useRef, useState } from 'react'

import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import { DATA } from "../../components/dataFetch"
import SkeletonKeycap from "../../components/skeletons/skeletonKeycap"

const ID = () => {
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

    const splitColors = (data) => {
        var string = data.includes('*') ? data.substring(1) : data
        var colors = string.split('|')
        var colorsData = []

        colors.map(color => {
            var hex = color.slice(0, 7)
            var name = color.slice(8) == '' ? hex : color.slice(8)
            colorsData.push({
                'name': name,
                'hex': hex
            })
        })
        return colorsData;
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
        }, 1000)
    }
    return (
        <Layout>
            <Head>
                <SEO title="eee" />
                {!keycaps.loading && keycaps.data.map((s) => {
                    <SEO

                        title={s.name}
                        description={`kb.wiki's keycap information on the ${s.name} set. This is a ${s.manufacturer.name} set designed by ${s.designer}, which ${

                            s.status.name == 'Completed' ? 'has been completed' :
                            s.status.name == 'Shipping' ? 'is shipping to vendors' :
                            s.status.name == 'Manufacturing' ? 'is being manufactured' :
                            s.status.name == 'Group_Buy' ? 'is in group buy' :
                            s.status.name == 'Interest_Check' ? 'is in interest check' : ''

                        }.`}
                        keywords={[s.name, `${s.name} keycaps`, `${s.name} keycap set`, `${s.profile.name}`]}
                        image={s.thumb.formats.medium.url}

                    />
                })}
            </Head>
            {!keycaps.loading && keycaps.data.map((s) => (
                <>
                    <div className="flex flex-col py-16" key={s.id}>
                        <div className="flex md:flex-row flex-col-reverse justify-between md:items-end">
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
                                            <li key={kit}>
                                                {kit}
                                            </li>
                                        ))}</ul>
                                    </section>
                                </div>
                                <div className='mb-4'>
                                    <h2 className="text-center text-lg tracking-wider">Colors featured</h2>
                                    <ul className='list-none flex flex-row flex-wrap justify-start'>
                                        {splitColors(s.colors).map((c) => (
                                            <li className='flex flex-col flex-wrap justify-center align-middle md:w-1/3 w-1/2 rounded-xl overflow-hidden' style={{border: "4px solid var(--bg-color)"}} key={c.name}>
                                                <div className='h-8 w-full mx-auto' style={{background: c.hex}}></div>
                                                {c.name == c.hex ? (
                                                    <div className="text-center p-1" style={{background: "var(--bg-accent)"}}>
                                                        <p className="font-bold">{c.name}</p>
                                                        <small>No color name</small>
                                                    </div>
                                                ) : (
                                                    <div className="text-center p-1" style={{background: "var(--bg-accent)"}}>
                                                        <p className="font-bold">{c.name}</p>
                                                        <small>{c.hex}</small>
                                                    </div>
                                                )}
                                                
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <section className="flex justify-between">
                                    <button onClick={copyURL} className="w-1/2 mr-2 h-8 uppercase rounded-xl font-nunito-black text-white" style={{background: "var(--primary-color)"}}>{!copied ? "Share" : "Copied"}</button>
                                    <button className="w-1/2 ml-2 h-8 uppercase rounded-xl font-nunito-black text-white" style={{background: "var(--secondary-color)"}}>Edit Article</button>
                                </section>
                            </div>
                        </div>
                    </div>
                </>
            ))}
            {keycaps.loading && (
                <SkeletonKeycap />
            )}  
        </Layout>
    )
}

export default ID
