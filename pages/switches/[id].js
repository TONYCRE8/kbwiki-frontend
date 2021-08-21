import {useRouter} from 'next/router'
import { DATA } from "../../components/dataFetch"
import Image from "next/image"

const id = () => {
    const router = useRouter()
    const { id } = router.query

    const data = DATA(`switches?_id=${id}`)

    return (
        <div>
            <p>Switch: {id}</p>
            {data.map((s) => (
                <div>
                    <Image width={256} height={170} src={`${process.env.REACT_APP_STRAPI_API}${s.thumb.formats.large.url}`} />
                    <h1>{s.name}</h1>
                    <p>Manufacturer: {s.manufacturer}</p>
                    <p>Actuation: {s.actuation}g</p>
                    <p>Bottom out: {s.bottom_out}g</p>
                </div>
            ))}
        </div>
    )
}

export default id
