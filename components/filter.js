import { DATA } from "./dataFetch"
import Select from "react-select"

function Filter() {
    const filterData = DATA("keycap-manufacturers?_sort=name:DESC")

    const data = filterData.data

    const handleFilter = values => {
        console.log(values)
    }
    return (
        <>
            <Select
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                options={data}
                instanceId="Types"
                placeholder="Manufacturer..."
                isClearable
                onChange={values => handleFilter(values.name)}
            />
        </>
    )
}

export default Filter
