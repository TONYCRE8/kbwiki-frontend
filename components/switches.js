import { DATA } from "../components/dataFetch"
import Link from "next/link"
import Image from "next/image"

const Switches = () => {
    const data = DATA("switches?_sort=name:DESC")
    return (
        <>
            {data.map((s) => (
              <Link href={`/switches/${s.id}`} key={s.id} id={s.id}>
                  <div>
                    <Image width={256} height={170} src={`${process.env.REACT_APP_STRAPI_API}${s.thumb.formats.large.url}`} />
                    <h1>{s.name}</h1>
                    <p>Manufacturer: {s.manufacturer}</p>
                    <p>Actuation: {s.actuation}g</p>
                    <p>Bottom out: {s.bottom_out}g</p>
                  </div>
              </Link>
            ))}
        </>
    )
}

export default Switches