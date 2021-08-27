import Link from "next/link"
import Image from "next/image"

import Layout from "../components/layout/layout"
import {DATA} from "../components/dataFetch"

import SkeletonKeycapList from "../components/skeletons/skeletonKeycapList"

import Select, { NonceProvider } from "react-select"
import {useQuery, useQueryClient} from "react-query"
import {useState} from "react"
import axios from "axios"
import StateManager from "react-select"

const getKeycaps = async(key) => {
    const manuId = key.queryKey[1].manu
    if (manuId) {
        const data = await axios(`${process.env.REACT_APP_STRAPI_API}/keycaps?manufacturer.id=${manuId}`)
        /* const data = DATA(`keycaps?manufacturer.id=${manuId}`)
        We should be able to use DATA from dataFetch to do this.
        but it won't work for some reason. */
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
    
    const customTheme = {
        option: (provided, state) => ({
            color: state.isSelected ? "white" : "var(--text-color)",
            background: state.isSelected ? "var(--secondary-color)" : "var(--bg-accent)",
            padding: "4px",
            width: "100px",
            textAlign: "center",
            borderRadius: 16,
            margin: "0 2px",
            ":active": {
                backgroundColor: "var(--secondary-color)",
                color: "white"
            }
          }),
          control: (provided) => ({
            ...provided,
            background: "none",
            border: "none",
          }),
          container: () => ({
            display: "flex",
            flexFlow: "row-reverse wrap"
          }),
          dropdownIndicator: () => ({
            display: "none"
          }),
          indicatorSeparator: () => ({
            display: "none"
          }),
          indicatorsContainer: (provided) => ({
            ...provided,
            width: 100
          }),
          menu: () => ({
            background: "none",
          }),
          menuList: () => ({
            display: "flex",
            flexFlow: "row wrap",
            width: "auto",
          }),
          valueContainer: (provided) => ({
              ...provided,
              display: "none"
          }),
          singleValue: () => ({
            display: "none",
          }),
          loadingMessage: () => ({
            color: "var(--text-color)"
          })
    }
    
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
                            styles={customTheme}
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
                        <div>Error loading data</div>
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
