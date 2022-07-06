import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import {MdArrowDropDown, MdArrowDropUp} from "react-icons/md"

import Layout from "../components/layout/layout"
import {DATA} from "../lib/dataFetch"
import { getAllSwitches } from "../lib/api"

import SkeletonSwitchList from "../components/skeletons/skeletonSwitchList"

import Select from "react-select"
import {useQuery, useQueryClient} from "react-query"
import {useState} from "react"
import axios from "axios"

import {selectTheme} from "../styles/select"

const getSwitches = async(key) => {
    console.log(key)
    const manuIds = key.queryKey[1].manu.map(id => `manufacturer.id=${id}`)
    const typeIds = key.queryKey[2].type.map(id => `type.id=${id}`)
    const rangeIds = key.queryKey[3].range.map(id => `range.id=${id}`)

    const manuQueryString = manuIds.join("&")
    const typeQueryString = typeIds.join("&")
    const rangeQueryString = rangeIds.join("&")

    const page = key.queryKey[4].page

    let start = (page * 12) - 12

    const data = await axios(`
        ${process.env.REACT_APP_STRAPI_API}/switches?${rangeQueryString ? rangeQueryString + '&' : ''}${typeQueryString ? typeQueryString + '&' : ''}${manuQueryString ? manuQueryString + '&' : ''}_start=${start}&_limit=12`)
    return data.data
}

export default function Switches ({allSwitches}) {

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
                pathname: '/switches',
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

    const [toggle, setToggle] = useState(false)

    const queryClient = useQueryClient()

    const manufacturers = DATA("switch-manufacturers").data
    const types = DATA("switch-types").data
    const ranges = DATA("switch-actuation-ranges").data

    const [manuId, setManuId] = useState([])
    const [typeId, setTypeId] = useState([])
    const [rangeId, setRangeId] = useState([])

    const curPage = router.query.page == null ? 1 : router.query.page

    const [nextDisabled, setNextDisabled] = useState(false)

    const {data, status} = useQuery(["switches", {manu: manuId}, {type: typeId}, {range: rangeId}, {page: curPage}], getSwitches)

    console.log(data)

    return (
        <Layout>
            <section className="flex lg:flex-row flex-col justify-between items-start">
                <div className="lg:w-1/3 2xl:mr-16 lg:mr-4 w-full">
                    <button onClick={toggleMenu} className="lg:pointer-events-none font-nunito-black text-xl uppercase cursor-pointer flex flex-row" style={{color: "var(--text-color)"}}>Filters {toggle ? <MdArrowDropUp className="lg:hidden block text-2xl"/> : <MdArrowDropDown className="lg:hidden block text-2xl" /> }</button>
                    <div className={`${toggle ? "flex h-92 py-4" : "hidden"} lg:flex transition-all duration-300 flex-col rounded-md my-4 shadow-lg`} style={{borderColor: "var(--primary-color)", background: "var(--bg-accent)"}}>
                        <div className="flex flex-col mx-4 my-2">
                            <p className="mr-4 mt-1 font-inter-semibold">Manufacturer: </p>
                            <Select
                                getOptionLabel={option => option.name}
                                getOptionValue={option => option.id}
                                options={manufacturers}
                                instanceId="Manufacturer"
                                placeholder=""
                                isSearchable
                                isClearable
                                isMulti
                                menuIsOpen
                                hideSelectedOptions={false}
                                onChange={values => setManuId(values ? values.map(value => value.id) : null)}
                                className="font-inter-regular"
                                styles={selectTheme}
                            />
                        </div>
                        <div className="flex flex-col mx-4 my-2">
                            <p className="mr-4 mt-1 font-inter-semibold">Type: </p>
                            <Select
                                getOptionLabel={option => option.name}
                                getOptionValue={option => option.id}
                                options={types}
                                instanceId="Type"
                                placeholder=""
                                isSearchable
                                isClearable
                                isMulti
                                menuIsOpen
                                hideSelectedOptions={false}
                                className="font-inter-regular capitalize justify-end"
                                onChange={values => setTypeId(values ? values.map(value => value.id) : null)}
                                styles={selectTheme}
                            />
                        </div>
                        <div className="flex flex-col mx-4 my-2">
                            <p className="mr-4 mt-1 font-inter-semibold">Actuation Range: </p>
                            <Select
                                getOptionLabel={option => option.name}
                                getOptionValue={option => option.id}
                                options={ranges}
                                instanceId="Range"
                                placeholder=""
                                isSearchable
                                isClearable
                                menuIsOpen
                                isMulti
                                hideSelectedOptions={false}
                                onChange={values => setRangeId(values ? values.map(value => value.id) : null)}
                                className="font-inter-regular"
                                styles={selectTheme}
                            />
                        </div>
                    </div>
                </div>
            <div className="flex flex-col w-full">
                <div className="flex lg:flex-row flex-wrap justify-around items-start">
                    {status === "loading" && (
                    <SkeletonSwitchList />
                    )}
                    {status === "error" && (
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
    const allSwitches = (await getAllSwitches() || 'Error')
    return {
        props: { allSwitches }
    }
}