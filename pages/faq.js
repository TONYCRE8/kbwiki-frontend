import Layout from "../components/layout/layout"
import { DATA } from "../lib/dataFetch"
import { getAllFAQs } from "../lib/api"

import { useState } from "react"


export default function Faq({getFAQs}) {
    const items = getFAQs.faqs
    console.log(items)

    const [selectedAccordian, setSelectedAccordion] = useState(null)

    return (
       <Layout>
           <h1 className="text-center mb-2 capitalize">Frequently asked questions</h1>
           <hr></hr>
           {items.map((item) => (
                <div key={item.id} onClick={() => setSelectedAccordion(item.id)} className="cursor-pointer border-l-8 border-solid rounded-md my-4" style={{borderColor: "var(--primary-color)", background: "var(--bg-accent)"}}>
                    <div className="p-4">
                        <h2 className="text-2xl mb-2">{item.name}</h2>
                        <p className={`${selectedAccordian === item.id ? "opacity-100 mt-0" : "opacity-0 -mt-16 h-16 pointer-events-none"} mx-8 transition-all transform duration-300`}>{item.description}</p>
                    </div>
                </div>
           ))}
       </Layout> 
    )
}

export async function getStaticProps() {
    const getFAQs = (await getAllFAQs() || 'Error')
    return {
        props: { getFAQs },
        revalidate: 604800 // a week
    }
}