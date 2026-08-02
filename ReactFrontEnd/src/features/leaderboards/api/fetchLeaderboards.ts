import axios, { AxiosError } from "axios";
import { LeaderboardsData, LeaderboardsFilter } from "../type";
import { useQuery } from "@tanstack/react-query";
import { regionTags } from "@/constants/regions";


export function useGetLeaderboards(filters: LeaderboardsFilter) {
    return useQuery<LeaderboardsData, AxiosError<string>>({
        queryKey: ['leaderboards', filters],
        queryFn: () => fetchLeaderboards(filters)
    })

}

async function fetchLeaderboards(filters: LeaderboardsFilter) {
    // default values
    let region = 'na1'
    let queue = 'solo'
    let start = '0'
    let end = '10'

    // Error Handling: wrong parameters
    if (filters.region) {
        if (regionTags.includes(filters.region.trim().toUpperCase())) {
            region = filters.region.trim().toLowerCase()
        }
    }

    if (filters.queue) {
        if (filters.queue.trim().toLowerCase() === 'flex') {
            queue = 'flex'
        }
    }

    if (filters.page) {
        start = `${(parseInt(filters.page) - 1) * 10}`
        end = `${(parseInt(filters.page) * 10)}`
    }


    const { data } = await axios.get<LeaderboardsData>(`http://127.0.0.1:5000/api/leaderboards`, { params: { region: region, queue: queue, start: start, end: end } })
    return data

}