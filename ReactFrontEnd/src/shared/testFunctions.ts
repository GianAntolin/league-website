export function buildParams(params: Record<string, unknown>) {
    return Object.entries(params).map(([key, value]) => {
        return `${key}=${value}`
    }).join('&')
    

}