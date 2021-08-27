import {useState, useEffect} from 'react'
import axios from 'axios'

export const DATA = (query) => {
    const [singleData, setSingleData] = useState()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async() =>
        {
            setError(false)
            setLoading(true)
            try {
                const res = await axios(`${process.env.REACT_APP_STRAPI_API}/${query}`)
                setData(res.data)
            } catch (error) {
                setError(true)
            }
            setLoading(false)
            console.log(data, query)
        }
        fetchData()
    }, [query])

    return {data, loading}
}