import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

type RecentGamesFilters = {
    region: string,
    id: string,
    start: number, 
    end: number
}

export function useGetRecentGames<T>(filters : RecentGamesFilters){
    return useQuery<T>({
        queryKey : ['/matchlist', filters],
        queryFn: () => fetchRecentGames(filters),
        placeholderData: keepPreviousData
    })
}

async function fetchRecentGames({region, id, start, end} : RecentGamesFilters){
    const { data } = await axios.get('http://127.0.0.1:5000/api/matches/champions', {params: {region: region, PUUID: id, start: start, end: end}})
    return data
}