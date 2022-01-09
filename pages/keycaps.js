import Link from "next/link"
import Image from "next/image"
import {MdArrowDropDown, MdArrowDropUp} from "react-icons/md"

import Layout from "../components/layout/layout"
import {DATA} from "../components/dataFetch"

import SkeletonKeycapList from "../components/skeletons/skeletonKeycapList"

import Select from "react-select"
import {useQuery, useQueryClient} from "react-query"
import {useState, useRef} from "react"
import axios from "axios"

import {selectTheme, colorSelectTheme} from "../styles/select"

const getKeycaps = async(key) => {
    const manuId = key.queryKey[1].manu
    const profileIds = key.queryKey[2].prof.map(id => `profile.id=${id}`)
    const colorIds = key.queryKey[3].col.map(id => `filter_colors.id=${id}`)
    const statId = key.queryKey[4].stat

    const profileQueryString = profileIds.join("&")
    const colorQueryString = colorIds.join("&")

    // Refine this whole thing

    if (manuId && profileQueryString && colorQueryString) {
        const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps?manufacturer.id=${manuId}&${profileQueryString}&${colorQueryString}`)
        return data.data
    }

    if (manuId && statId && colorQueryString) {
        const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps?manufacturer.id=${manuId}&status.id=${statId}&${colorQueryString}`)
        return data.data
    }

    if (manuId && profileQueryString && statId) {
        const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps?manufacturer.id=${manuId}&${profileQueryString}&status.id=${statId}`)
        return data.data
    }

    if (statId && profileQueryString && colorQueryString) {
        const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps?status.id=${statId}&${profileQueryString}&${colorQueryString}`)
        return data.data
    }

    if (manuId && profileQueryString) {
        const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps?manufacturer.id=${manuId}&${profileQueryString}`)
        return data.data
    }

    if (manuId && colorQueryString) {
        const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps?manufacturer.id=${manuId}&${colorQueryString}`)
        return data.data
    }

    if (profileQueryString && colorQueryString) {
        const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps?${profileQueryString}&${colorQueryString}`)
        return data.data
    }

    if (statId && profileQueryString) {
        const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps?manufacturer.id=${statId}&${profileQueryString}`)
        return data.data
    }

    if (statId && colorQueryString) {
        const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps?manufacturer.id=${statId}&${colorQueryString}`)
        return data.data
    }

    if (statId && manuId) {
        const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps?status.id=${statId}&manufacturer.id=${manuId}`)
        return data.data
    }

    if (manuId) {
        const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps?manufacturer.id=${manuId}`)
        return data.data
    }
    if (profileQueryString) {
        const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps?${profileQueryString}`)
        return data.data
    }
    if (colorQueryString) {
        const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps?${colorQueryString}`)
        return data.data
    }
    if (statId) {
        const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps?status.id=${statId}`)
        return data.data
    }
    const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps`)
    return data.data
}

function Keycaps ({}) {
    const toggleMenu = () => {
        if (toggle) {
            setToggle(!toggle)
        }
        else {
            setToggle(!toggle)
        }
        console.log(toggle)
    }

    const [toggle, setToggle] = useState(false)

    const queryClient = useQueryClient()

    const manufacturer = DATA("keycap-manufacturers")
    const profile = DATA("keycap-profiles")
    const color = DATA("keycap-colors")
    const itemStatus = DATA("statuses")

    const manufacturers = manufacturer.data
    const profiles = profile.data
    const colors = color.data
    const statuses = itemStatus.data

    const [manuId, setManuId] = useState(null)
    const [profileId, setProfileId] = useState([])
    const [colorId, setColorId] = useState([])
    const [statusId, setStatusId] = useState(null)
    
    const {data, status} = useQuery(["keycaps", {manu: manuId}, {prof: profileId}, {col: colorId}, {stat: statusId}], getKeycaps)
    return (
        <Layout>
            <section className="flex flex-col">
                <button onClick={toggleMenu} className="font-nunito-black text-xl uppercase cursor-pointer flex flex-row" style={{color: "var(--text-color)"}}>Filters {toggle ? <MdArrowDropUp className="text-2xl"/> : <MdArrowDropDown className="text-2xl" /> }</button>
                <div className={`${toggle ? "flex h-92 py-4" : "h-0"} transition-all duration-300 overflow-hidden flex-col border-l-8 border-solid rounded-md my-4`} style={{borderColor: "var(--primary-color)", background: "var(--bg-accent)"}}>
                    <div className="flex flex-row ml-4 my-2">
                        <p className="mr-4 mt-1 font-inter-semibold">Manufacturer: </p>
                        <Select
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.id}
                            options={manufacturers}
                            instanceId="Manufacturers"
                            placeholder=""
                            isSearchable
                            isClearable
                            menuIsOpen
                            onChange={value => setManuId(value ? value.id : null)}
                            className="font-inter-regular flex reverse flex-nowrap"
                            styles={selectTheme}
                        />
                    </div>
                    <div className="flex flex-row ml-4 my-2">
                        <p className="mr-4 mt-1 font-inter-semibold">Profile: </p>
                        <Select
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.id}
                            options={profiles}
                            instanceId="Profiles"
                            placeholder=""
                            isSearchable
                            isClearable
                            isMulti
                            menuIsOpen
                            hideSelectedOptions={false}
                            className="font-inter-regular"
                            onChange={values => setProfileId(values ? values.map(value => value.id) : null)}
                            styles={selectTheme}
                        />
                    </div>
                    <div className="flex flex-row ml-4 my-2">
                        <p className="mr-4 mt-1 font-inter-semibold">Color: </p>
                        <Select
                            getOptionLabel={option => option.color}
                            getOptionValue={option => option.id}
                            options={colors}
                            instanceId="Colors"
                            placeholder=""
                            isSearchable
                            isClearable
                            isMulti
                            menuIsOpen
                            hideSelectedOptions={false}
                            className="font-inter-regular capitalize justify-end"
                            onChange={values => setColorId(values ? values.map(value => value.id) : null)}
                            styles={colorSelectTheme}
                        />
                    </div>
                    <div className="flex flex-row ml-4 my-2">
                        <p className="mr-4 mt-1 font-inter-semibold">Status: </p>
                        <Select
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.id}
                            options={statuses}
                            instanceId="Status"
                            placeholder=""
                            isSearchable
                            isClearable
                            menuIsOpen
                            onChange={value => setStatusId(value ? value.id : null)}
                            className="font-inter-regular"
                            styles={selectTheme}
                        />
                    </div>
                </div>
            </section>
            <section className="flex flex-row flex-wrap justify-center">
                {status === "loading" && (
                    <SkeletonKeycapList />
                    /* status ==== "loading" never actually activates
                    Replace with keycaps.loading */
                )}
                {status === "error" && (
                    // This can call when we make getKeycaps use DATA from fetchData
                    <div className="pt-16">
                        <p style={{color: "var(--text-color)"}}>Error loading data, please try again later.</p>
                    </div>
                )}
                {status === "success" && data.length === 0 && (
                    <div className="pt-16">
                        <p style={{color: "var(--text-color)"}}>Nothing matches your search! Select some different filters and try again!</p>
                    </div>
                )}

                {status === "success" && data.map((s) => (
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
            </section>
        </Layout>
    )
}

export default Keycaps
