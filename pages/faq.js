import Layout from "../components/layout/layout"
import {DATA} from "../components/dataFetch"

import { useState } from "react"


const Faq = () => {
    const items = DATA("faqs")

    const [selectedAccordian, setSelectedAccordion] = useState(null)

    return (
       <Layout>
           <h1 className="text-center mb-2">F&Q</h1>
           <hr></hr>
           {items.data.map((item) => (
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

export default Faq
