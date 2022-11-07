import axios from "axios"

async function fetchAPI(query, {variables} = {}) {
    try {
        const res = await fetch(`${process.env.REACT_APP_STRAPI_API}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        })
    
        const json = await res.json()

        if (json.errors) {
            console.error(json.errors)
            throw new Error('Failed to fetch API')
        }
    
        console.log('json', json.data, variables)
    
        return json.data
    }
    catch(e) {
        console.log(e)
    }
}

/* Keycap related grabs */

export async function getAllKeycaps() {
    const data = await fetchAPI(
        `
        {
            keycaps {
                id
                slug
                name
                published_at
                updatedAt
                profile {
                    id
                    name
                }
                manufacturer {
                    id
                    name
                    lead
                }
                run_start
                run_end
                status {
                    id
                    name
                }
                colors
                filter_colors {
                    color
                }
                kits
                designer
                thumb {
                    formats
                }
            }
        }
        `
    )
    return data
}

export async function getAllKeycapsBySlug() {
    const data = await fetchAPI(
        `
        {
            keycaps {
                slug
            }
        }
        `
    )
    return data?.keycaps
}

export async function getKeycap(slug) {
    const data = await fetchAPI(
        `
        query KeycapBySlug($where: JSON) {
            keycaps(where: $where) {
                id
                slug
                name
                published_at
                updatedAt
                profile {
                    id
                    name
                }
                manufacturer {
                    id
                    name
                    lead
                }
                run_start
                run_end
                status {
                    id
                    name
                }
                colors
                filter_colors {
                    color
                }
                kits
                designer
                thumb {
                    formats
                }
            }
        }   
        `, {
            variables: {
                where: {
                    slug,
                },
            },
        }
    )
    return data
}

/* Switch related grabs */

export async function getAllSwitches() {
    const data = await fetchAPI(
        `
        {
            switches {
                id
                slug
                name
                published_at
                updatedAt
              	actuation
              	bottom_out
              	pre_travel
              	pre_travel_tolerance
              	total_travel
              	total_travel_tolerance
              	designer
              	material_stem
              	material_top
              	material_bottom
              	spring
              	type {
                  id
                  name
                }
              	manufacturer {
                  id
                  name
                }
              	actuation_range {
                  id
                  name
                }
                thumb {
                  formats
                }              	
            }
        }`
    )
    return data
}

export async function getAllSwitchesBySlug() {
    const data = await fetchAPI(
        `
        {
            switches {
                slug
            }
        }
        `
    )
    return data?.switches
}

export async function getSwitch(slug) {
    const data = await fetchAPI(
        `
        query SwitchesBySlug($where: JSON) {
            switches(where: $where) {
                id
                slug
                name
                published_at
                updatedAt
              	actuation
              	bottom_out
              	pre_travel
              	pre_travel_tolerance
              	total_travel
              	total_travel_tolerance
              	designer
              	material_stem
              	material_top
              	material_bottom
              	spring
              	type {
                  id
                  name
                }
              	manufacturer {
                  id
                  name
                }
              	actuation_range {
                  id
                  name
                }
                thumb {
                  formats
                }
            }
        }
        `, {
            variables: {
                where: {
                    slug
                },
            },
        }
    )
    return data
}

/* misc data */

export async function getAllFAQs() {
    const data = await fetchAPI(
        `
        {
            faqs {
                id
                name
                description
                updatedAt
            }
        }
        `
    )
    return data
}

/* 

filters:

    we can use graphql to recreate our filters system, and remove the need for React Query.
    we can use queries like:
    {
        "where": {
            "filter_colors": {
                "color": "beige"
            },
            "manufacturer": {
                "name": "GMK"
            }
        }
    }



*/