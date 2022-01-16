async function fetchAPI(query, {variables} = {}) {
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
    console.log('by slug:', data?.keycaps)
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
        `,
        {
            variables: {
                where: {
                    slug,
                },
            },
        }
    )
    console.log('get keycap', data)
    return data
}