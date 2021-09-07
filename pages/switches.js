import {DATA} from "../components/dataFetch"
import Layout from "../components/layout/layout"

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

  if (manuId && typeId && rangeId) {
    const data = await axios(`${process.env.REACT_APP_STRAPI_API}/switches?actuation_range.id=${rangeId}&type.id=${typeId}&manufacturer.id=${manuId}`)
    return data.data
  }

  if (typeId && manuId) {
    const data = await axios(`${process.env.REACT_APP_STRAPI_API}/switches?manufacturer.id=${manuId}&type.id=${typeId}`)
    return data.data
  }

  if (rangeId && manuId) {
    const data = await axios(`${process.env.REACT_APP_STRAPI_API}/switches?actuation_range.id=${rangeId}&manufacturer.id=${manuId}`)
    return data.data
  }

  if (rangeId && typeId) {
    const data = await axios(`${process.env.REACT_APP_STRAPI_API}/switches?actuation_range.id=${rangeId}&type.id=${typeId}`)
    return data.data
  }

  if (rangeId) {
    const data = await axios(`${process.env.REACT_APP_STRAPI_API}/switches?actuation_range.id=${rangeId}`)
    return data.data
  }

  if (typeId) {
    const data = await axios(`${process.env.REACT_APP_STRAPI_API}/switches?type.id=${typeId}`)
    return data.data
  }

  if (manuId) {
    const data = await axios(`${process.env.REACT_APP_STRAPI_API}/switches?manufacturer.id=${manuId}`)
    return data.data
  }

  const data = await axios(`${process.env.REACT_APP_STRAPI_API}/switches`)
  return data.data
}

const Switches = () => {
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
            <p className="font-nunito-black uppercase">Filters V</p>
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
                  <div className="flex flex-row justify-between w-80 h-28 border-r-8 rounded-md cursor-pointer m-4 shadow-lg transition transform duration-150 hover:-translate-y-1" style={{borderColor: "var(--primary-color)"}}>
                    <Image className="rounded-lg" width={112} height={112} src={`${process.env.REACT_APP_STRAPI_API}${s.thumb.formats.thumbnail.url}`} />
                    <div className="flex flex-col mr-4 text-right justify-between h-full pb-2">
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