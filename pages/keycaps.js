import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import {MdArrowDropDown, MdArrowDropUp} from "react-icons/md"

import Layout from "../components/layout/layout"
import {DATA} from "../lib/dataFetch"
import { getAllKeycaps } from "../lib/api"

import SkeletonKeycapList from "../components/skeletons/skeletonKeycapList"

import Select from "react-select"
import {useQuery, useQueryClient} from "react-query"
import {useState, useEffect} from "react"
import axios from "axios"

import {selectTheme} from "../styles/select"

const getKeycaps = async(key) => {
    const manuIds = key.queryKey[1].manu.map(id=>`manufacturer.id=${id}`)
    const profileIds = key.queryKey[2].prof.map(id => `profile.id=${id}`)
    const colorIds = key.queryKey[3].col.map(id => `filter_colors.id=${id}`)
    const statIds = key.queryKey[4].stat.map(id => `status.id=${id}`)

    const manuQueryString = manuIds.join("&")
    const profileQueryString = profileIds.join("&")
    const colorQueryString = colorIds.join("&")
    const statusQueryString = statIds.join("&")

    const page = key.queryKey[5].page

    let start = (page * 12) - 12 // set every 10 to 20 when in prod

    const data = await axios(`
        ${process.env.REACT_APP_STRAPI_API}/keycaps?${manuQueryString ? manuQueryString + '&' : ''}${profileQueryString ? profileQueryString + '&' : ''}${colorQueryString ? colorQueryString + '&' : ''}${statusQueryString ? statusQueryString + '&' : ''}_start=${start}&_limit=12`)
    return data.data
}

export default function Keycaps ({allKeycaps}) {

    const router = useRouter()

    const pageToggle = (dir) => {
    
        let pageNo = router.query.page == null ? 1 : router.query.page
    
        if (dir == 'next') {
            if (data.length == 12) {
                pageNo++
                setNextDisabled(!nextDisabled)
            } else {
                setNextDisabled(!nextDisabled)
            }
        } else {
            if (pageNo != 1) {
                pageNo--
            }
            setNextDisabled(false)
        }

        router.push(
            {
                pathname: '/keycaps',
                query: {page: pageNo}
            },
            null,
            {shallow: true}
        )
    }

    const toggleMenu = () => {
        if (toggle) {
            setToggle(!toggle)
        }
        else {
            setToggle(!toggle)
        }
        console.log(toggle)
    }

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

    const [toggle, setToggle] = useState(false)

    const queryClient = useQueryClient()

    const manufacturers = DATA("keycap-manufacturers").data
    const profiles = DATA("keycap-profiles").data
    const colors = DATA("keycap-colors").data
    const statuses = DATA("statuses").data

    const [manuId, setManuId] = useState([])
    const [profileId, setProfileId] = useState([])
    const [colorId, setColorId] = useState([])
    const [statusId, setStatusId] = useState([])

    const curPage = router.query.page == null ? 1 : router.query.page

    const [nextDisabled, setNextDisabled] = useState(false)

    const {data, status} = useQuery(["keycaps", {manu: manuId}, {prof: profileId}, {col: colorId}, {stat: statusId}, {page: curPage}], getKeycaps)

    console.log(data)

    return (
        <Layout>
            <section className="flex lg:flex-row flex-col justify-between items-start">
                <div className="lg:w-1/3 2xl:mr-16 lg:mr-4 w-full">
                    <button onClick={toggleMenu} className="lg:pointer-events-none font-nunito-black text-xl uppercase cursor-pointer flex flex-row" style={{color: "var(--text-color)"}}>Filters {toggle ? <MdArrowDropUp className="lg:hidden block text-2xl"/> : <MdArrowDropDown className="lg:hidden block text-2xl" /> }</button>
                        <div className={`${toggle ? "flex h-92 py-4" : "hidden"} lg:flex transition-all duration-300 flex-col rounded-md my-4 shadow-lg pointer-events-none`} style={{borderColor: "var(--primary-color)", background: "var(--bg-accent)"}}>
                            <div className="flex flex-col mx-4 my-2">
                                <p className="mr-4 mt-1 font-inter-semibold">Manufacturer: </p>
                                <Select
                                    getOptionLabel={option => option.name}
                                    getOptionValue={option => option.id}
                                    options={manufacturers}
                                    instanceId="Manufacturer"
                                    placeholder=""
                                    isClearable
                                    isMulti
                                    menuIsOpen
                                    hideSelectedOptions={false}
                                    onChange={values => setProfileId(values ? values.map(value => value.id) : null)}
                                    className="font-inter-regular"
                                    styles={selectTheme}
                                />
                            </div>
                            <div className="flex flex-col mx-4 my-2">
                                <p className="mr-4 mt-1 font-inter-semibold">Profile: </p>
                                <Select
                                    getOptionLabel={option => option.name}
                                    getOptionValue={option => option.id}
                                    options={profiles}
                                    instanceId="Profiles"
                                    placeholder=""
                                    isClearable
                                    isMulti
                                    menuIsOpen
                                    hideSelectedOptions={false}
                                    className="font-inter-regular"
                                    onChange={values => setProfileId(values ? values.map(value => value.id) : null)}
                                    styles={selectTheme}
                                />
                            </div>
                            <div className="flex flex-col mx-4 my-2">
                                <p className="mr-4 mt-1 font-inter-semibold">Color: </p>
                                <Select
                                    getOptionLabel={option => option.color}
                                    getOptionValue={option => option.id}
                                    options={colors}
                                    instanceId="Colors"
                                    placeholder=""
                                    isClearable
                                    isMulti
                                    menuIsOpen
                                    hideSelectedOptions={false}
                                    className="font-inter-regular capitalize justify-end"
                                    onChange={values => setColorId(values ? values.map(value => value.id) : null)}
                                    styles={selectTheme}
                                />
                            </div>
                            <div className="flex flex-col mx-4 my-2">
                                <p className="mr-4 mt-1 font-inter-semibold">Status: </p>
                                <Select
                                    getOptionLabel={option => option.name}
                                    getOptionValue={option => option.id}
                                    options={statuses}
                                    instanceId="Status"
                                    placeholder=""
                                    isClearable
                                    isMulti
                                    menuIsOpen
                                    hideSelectedOptions={false}
                                    onChange={values => setStatusId(values ? values.map(value => value.id) : null)}
                                    className="font-inter-regular"
                                    styles={selectTheme}
                                />
                            </div>
                        </div>
                </div>
                <div className="flex flex-col w-full    ">
                    <div className="flex lg:flex-row flex-wrap justify-around items-start">
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
                                <div className="w-72 2xl:m-4 lg:m-1 m-4 rounded-lg cursor-pointer shadow-lg transition transform duration-150 hover:-translate-y-1" style={{background: "var(--bg-accent)"}}>
                                    <Image className="rounded-t-xl object-cover w-full" width={288} height={72} src={`${process.env.REACT_APP_STRAPI_API}${s.thumb.formats.small.url}`} />
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
                    <div className="flex flex-row flex-wrap justify-center">
                        <button disabled={curPage == 1 ? true : false} className="cursor-pointer w-32 h-8 pt-1 ml-2 uppercase rounded-xl font-nunito-black text-center" style={{background: "var(--secondary-color)", color: "var(--bg-accent)"}} onClick={() => pageToggle('prev')}>
                            Prev
                        </button>
                        <button disabled={nextDisabled} className="cursor-pointer w-32 h-8 pt-1 ml-2 uppercase rounded-xl font-nunito-black text-center" style={{background: "var(--secondary-color)", color: "var(--bg-accent)"}} onClick={() => pageToggle('next')}>
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    const allKeycaps = (await getAllKeycaps() || 'Error')
    return {
        props: { allKeycaps }
    }
}