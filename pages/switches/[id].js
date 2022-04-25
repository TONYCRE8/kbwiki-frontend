import {useRouter} from 'next/router'
import Image from "next/image"
import React, { useRef, useState } from 'react'

import Layout from "../../components/layout/layout"
import SEO from "../../components/layout/seo"
import { DATA } from "../../lib/dataFetch"
import SkeletonSwitch from '../../components/skeletons/skeletonSwitch'
import { getAllSwitchesBySlug, getSwitch } from '../../lib/api'

const ID = ({_switch}) => {

    const s = _switch.switches[0]

    console.log(s)

    const router = useRouter()
    const { id } = router.query

    const switches = DATA(`switches?_slug=${id}`)

    const [copied, setCopied] = useState(false)
    const urlCopy = useRef(null)

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
            <SEO
            
                title={s.name}
                description={`kb.wiki's switch information on the ${s.name} switch. This is a ${s.type.name} switch made by ${s.manufacturer.name} and designed by ${s.designer}.`}
                keywords={[s.name, `${s.name} switch`, `${s.type.name} switches`, `${s.manufacturer.name} switches`]}
                image={s.thumb.formats.small.url}
                article_data={{type: 'switches', dateModified: s.updatedAt, datePublished: s.published_at}}
            
            />
            <>
                <div className="flex flex-col py-16" key={s.id}>
                    <div className="flex flex-row justify-between items-end">
                        <h1>{s.name}</h1>
                        <small>Last edited: {s.updatedAt.slice(0,10)}</small>
                    </div>
                    <hr></hr>
                    <div className="flex justify-center md:flex-row flex-col mt-8">
                        <div>
                            <Image className="rounded-lg w-1/2 bg-white" width={500} height={500} src={`${process.env.REACT_APP_STRAPI_API}${s.thumb.formats.small.url}`} />
                        </div>
                        <div className="md:w-1/2 md:max-w-md w-full md:ml-4">
                            <div className="rounded-lg p-4 mb-4" style={{background: "var(--bg-accent)"}}>
                                <section className="mb-2">
                                    <h2 className="text-center text-lg tracking-wider">General Info</h2>
                                    <div className="flex flex-row justify-between">
                                        <p>Type:</p>
                                        <p className="font-inter-thin capitalize">{s.type.name}</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p>Manufacturer:</p>
                                        <p className="font-inter-thin">{s.manufacturer.name}</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p>Designer:</p>
                                        <p className="font-inter-thin">{s.designer}</p>
                                    </div>
                                </section>
                                <section className="mb-2">
                                    <h2 className="text-center text-lg tracking-wider">Operation Details</h2>
                                    <div className="flex flex-row justify-between">
                                        <p>Actuation:</p>
                                        <p className="font-inter-thin">{s.actuation}g</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p>Bottom Out:</p>
                                        <p className="font-inter-thin">{s.bottom_out}g</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p>Pre-Travel:</p>
                                        <p className="font-inter-thin">{s.pre_travel_tolerance == null ? `${s.pre_travel}mm` : `${s.pre_travel}±${s.pre_travel_tolerance}mm`}</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p>Total Travel:</p>
                                        <p className="font-inter-thin">{s.total_travel_tolerance == null ? `${s.total_travel}mm` : `${s.total_travel}±${s.total_travel_tolerance}mm`}</p>
                                    </div>
                                </section>
                                <section>
                                    <h2 className="text-center text-lg tracking-wider">Materials</h2>
                                    <div className="flex flex-row justify-between">
                                        <p>Stem:</p>
                                        <p className="font-inter-thin">{s.material_stem}</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p>Top Housing:</p>
                                        <p className="font-inter-thin">{s.material_top}</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p>Bottom Housing:</p>
                                        <p className="font-inter-thin">{s.material_bottom}</p>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <p>Spring:</p>
                                        <p className="font-inter-thin">{s.spring}</p>
                                    </div>
                                </section>
                            </div>
                            <section className="flex justify-between">
                                <button onClick={copyURL} className={`${copied ? "opacity-40" : ""} transition duration-300 w-1/2 mr-2 h-8 uppercase rounded-xl font-nunito-black text-white`} style={{background: "var(--primary-color)"}}>{!copied ? "Share" : "Copied"}</button>
                                <button className="w-1/2 ml-2 h-8 uppercase rounded-xl font-nunito-black text-white" style={{background: "var(--secondary-color)"}}>Edit Article</button>
                            </section>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
        /* {!switches.loading && switches.data.map((s) => (
                    <div className="flex flex-col py-16" key={s.id}>
                        <div className="flex flex-row justify-between items-end">
                            <h1>{s.name}</h1>
                            <small>Last edited: {s.updatedAt.slice(0,10)}</small>
                        </div>
                        <hr></hr>
                        <div className="flex justify-center md:flex-row flex-col mt-8">
                            <div>
                                <Image className="rounded-lg w-1/2 bg-white" width={500} height={500} src={`${process.env.REACT_APP_STRAPI_API}${s.thumb.formats.small.url}`} />
                            </div>
                            <div className="md:w-1/2 md:max-w-md w-full md:ml-4">
                                <div className="rounded-lg p-4 mb-4" style={{background: "var(--bg-accent)"}}>
                                    <section className="mb-2">
                                        <h2 className="text-center text-lg tracking-wider">General Info</h2>
                                        <div className="flex flex-row justify-between">
                                            <p>Type:</p>
                                            <p className="font-inter-thin capitalize">{s.type.name}</p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p>Manufacturer:</p>
                                            <p className="font-inter-thin">{s.manufacturer.name}</p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p>Designer:</p>
                                            <p className="font-inter-thin">{s.designer}</p>
                                        </div>
                                    </section>
                                    <section className="mb-2">
                                        <h2 className="text-center text-lg tracking-wider">Operation Details</h2>
                                        <div className="flex flex-row justify-between">
                                            <p>Actuation:</p>
                                            <p className="font-inter-thin">{s.actuation}g</p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p>Bottom Out:</p>
                                            <p className="font-inter-thin">{s.bottom_out}g</p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p>Pre-Travel:</p>
                                            <p className="font-inter-thin">{s.pre_travel_tolerance == null ? `${s.pre_travel}mm` : `${s.pre_travel}±${s.pre_travel_tolerance}mm`}</p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p>Total Travel:</p>
                                            <p className="font-inter-thin">{s.total_travel_tolerance == null ? `${s.total_travel}mm` : `${s.total_travel}±${s.total_travel_tolerance}mm`}</p>
                                        </div>
                                    </section>
                                    <section>
                                        <h2 className="text-center text-lg tracking-wider">Materials</h2>
                                        <div className="flex flex-row justify-between">
                                            <p>Stem:</p>
                                            <p className="font-inter-thin">{s.material_stem}</p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p>Top Housing:</p>
                                            <p className="font-inter-thin">{s.material_top}</p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p>Bottom Housing:</p>
                                            <p className="font-inter-thin">{s.material_bottom}</p>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <p>Spring:</p>
                                            <p className="font-inter-thin">{s.spring}</p>
                                        </div>
                                    </section>
                                </div>
                                <section className="flex justify-between">
                                    <button onClick={copyURL} className={`${copied ? "opacity-40" : ""} transition duration-300 w-1/2 mr-2 h-8 uppercase rounded-xl font-nunito-black text-white`} style={{background: "var(--primary-color)"}}>{!copied ? "Share" : "Copied"}</button>
                                    <button className="w-1/2 ml-2 h-8 uppercase rounded-xl font-nunito-black text-white" style={{background: "var(--secondary-color)"}}>Edit Article</button>
                                </section>
                            </div>
                        </div>
                    </div>
                ))}

            {switches.loading && (
                <SkeletonSwitch />
            )} */
    )
}

export async function getStaticProps({params}) {
    console.log('static props:', params)
    const data = await getSwitch(params.id)
    return {
        props: {
            _switch: {
                ...data
            }
        },
        revalidate: 300
    }
}

export async function getStaticPaths() {
    const allSwitches = await getAllSwitchesBySlug()
    console.log('static paths:', allSwitches)
    return {
        paths: allSwitches?.map((_switch) => `/switches/${_switch.slug}`) || [],
        fallback: 'blocking',
    }
}

export default ID
