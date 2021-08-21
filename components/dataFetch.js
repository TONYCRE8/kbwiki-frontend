import {useState, useEffect} from 'react'
import axios from 'axios'

export function DATA(query) {
    const [data, setData] = useState([])
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_STRAPI_API}/${query}`)
        .then(response => {
            setData(response.data)
            console.log(response.data)
        })
        .catch(console.error)
    }, [query])

    return data
} 