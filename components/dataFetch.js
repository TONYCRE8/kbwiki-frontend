import {useState, useEffect} from 'react'
import axios from 'axios'

export function DATA(query) {
    const [singleData, setSingleData] = useState()
    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_STRAPI_API}/${query}`)
            .then(response => {
                setData(response.data)
                setSingleData(response.data)
                setLoaded(true)
            })
            .catch(console.error)
    }, [query])

    return {data, singleData, loaded}
} 