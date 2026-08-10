import { APIErrorResponse } from "@/shared/type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

type MatchHistoryFilters = {
    region: string, 
    PUUID: string, 
    start: number,
    count: string
    

}

export function useGetMatchHistory<T>(filters: MatchHistoryFilters){
    return useQuery<T, AxiosError<APIErrorResponse>>({
        queryKey: ['/matchHistory', filters],
        queryFn: () => fetchMatchHistory(filters),
        placeholderData: keepPreviousData
    })
}






async function fetchMatchHistory({region, PUUID, start, count}: MatchHistoryFilters){
    const { data } = await axios.get('http://127.0.0.1:5000/api/matches', {params : {region: region, PUUID: PUUID, start: start, count: count}})
    return data
}