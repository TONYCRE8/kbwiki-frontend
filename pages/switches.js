import {DATA} from "../lib/dataFetch"
import Layout from "../components/layout/layout"
import {MdArrowDropDown, MdArrowDropUp} from "react-icons/md"

import Link from "next/link"
import Image from "next/image"

import SkeletonSwitchList from "../components/skeletons/skeletonSwitchList"

import Select from "react-select"
import {useQuery, useQueryClient} from "react-query"
import {useState} from "react"
import axios from "axios"

import {selectTheme} from "../styles/select"

const getSwitches = async(key) => {
  const manuId = key.queryKey[1].manu
  const typeId = key.queryKey[2].type
  const rangeId = key.queryKey[3].range

  let urlParams = new URLSearchParams(document.location.search);
  let page = urlParams.get("page") == null ? 1 : parseInt(urlParams.get("page"));

  let start = (page * 10) - 10 // set every 10 to 20 when in prod

  const data = await axios(`
    ${process.env.REACT_APP_STRAPI_API}/switches?${rangeId ? 'actuation_range.id=' + rangeId + '&' : ''}${typeId ? 'type.id=' + rangeId + '&' : ''}${manuId ? 'manufacturer.id=' + manuId + '&' : ''}_start=${start}&_limit=10`)
  return data.data
}

const Switches = () => {
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

    const switches = DATA("switches")

    const manufacturers = DATA("switch-manufacturers").data
    const types = DATA("switch-types").data
    const ranges = DATA("switch-actuation-ranges").data

    const [manuId, setManuId] = useState(null)
    const [typeId, setTypeId] = useState(null)
    const [rangeId, setRangeId] = useState(null)

    const {data, status} = useQuery(["switches", {manu: manuId}, {type: typeId}, {range: rangeId}], getSwitches)
    return (
        <Layout>
          <section className="flex flex-col">
          <button onClick={toggleMenu} className="font-nunito-black text-xl uppercase cursor-pointer flex flex-row" style={{color: "var(--text-color)"}}>Filters {toggle ? <MdArrowDropUp className="text-2xl"/> : <MdArrowDropDown className="text-2xl" /> }</button>
          <div className={`${toggle ? "flex h-72 py-4" : "h-0"} transition-all duration-300 overflow-hidden flex-col border-l-8 border-solid rounded-md my-4`} style={{borderColor: "var(--primary-color)", background: "var(--bg-accent)"}}>
            <div className="flex flex-row ml-4 my-2">
                <p className="mr-4 mt-1 font-inter-semibold">Manufacturer: </p>
                <Select
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    options={manufacturers}
                    instanceId="Manufacturer"
                    placeholder=""
                    isSearchable
                    isClearable
                    menuIsOpen
                    onChange={value => setManuId(value ? value.id : null)}
                    className="font-inter-regular"
                    styles={selectTheme}
                />
            </div>
            <div className="flex flex-row ml-4 my-2">
                <p className="mr-4 mt-1 font-inter-semibold">Type: </p>
                <Select
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                    options={types}
                    instanceId="Type"
                    placeholder=""
                    isSearchable
                    isClearable
                    menuIsOpen
                    onChange={value => setTypeId(value ? value.id : null)}
                    className="font-inter-regular"
                    styles={selectTheme}
                />
            </div>
            <div className="flex flex-row ml-4 my-2">
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
                    onChange={value => setRangeId(value ? value.id : null)}
                    className="font-inter-regular"
                    styles={selectTheme}
                />
            </div>
          </div>
          </section>
          <section className="flex flex-row flex-wrap justify-center">
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
                    <Image className="rounded-lg" width={128} height={128} src={`${process.env.REACT_APP_STRAPI_API}${s.thumb.formats.thumbnail.url}`} />
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
          </section>
        </Layout>
    )
}

export default Switches