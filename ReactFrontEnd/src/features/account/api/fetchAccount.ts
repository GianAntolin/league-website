import { useQuery } from "@tanstack/react-query";
import {SummonerData } from "../type";
import axios, { AxiosError } from "axios";

export type AccountFilters = {
    region : string | undefined, 
    name: string | undefined, 
    tag: string | undefined
}



export function useGetAccount(filters: AccountFilters){
    return useQuery<SummonerData, AxiosError>({
        queryKey: ['/accounts', filters],
        queryFn: () => fetchAccount(filters)
    }) 
}


async function fetchAccount({region, name, tag} : AccountFilters){
    const { data } = await axios.get('http://127.0.0.1:5000/api/accounts', {params : {region: region, name: name, tag: tag}})
    return data
}