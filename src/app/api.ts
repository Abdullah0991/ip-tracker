import axios from "axios"

export interface LocationResponse {
    country: string
    region: string
    timezone: string
    city: string
    lat: number
    lng: number
    postalCode: string
    geonameId: number
}
export interface IPLocationResponse {
    ip: string
    isp: string
    location: LocationResponse
    domains?: string[]
}

const apiKey = 'at_Tb4BJ5KtsBOBaFQ2aNCT6m7Hj6SX2'

export const getIPInfo = (query?: string): Promise<IPLocationResponse> => {
    const params = {};
    if (query && query.trim().length > 0) {
        /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(query) ?
            Object.assign(params, { ipAddress: query }) :
            Object.assign(params, { domain: query });
    } else {
        Object.assign(params, { ipAddress: query });
    }

    return axios.get<IPLocationResponse>(`https://geo.ipify.org/api/v2/country,city`, {
        params: {
            apiKey,
            ...params
        }
    }).then(res => res.data);
}