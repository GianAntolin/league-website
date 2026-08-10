import { APIErrorResponse } from "@/shared/type";
import { useQuery } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

type SearchAccountFilters = {
    region: string,
    name: string,
}

export function useGetSearchAccount<T>(filters: SearchAccountFilters) {
    return useQuery<T, AxiosError<APIErrorResponse>>({
        queryKey: ['/search', filters],
        queryFn: () => fetchSearchAccount(filters)
    })
}




async function fetchSearchAccount({ region, name }: SearchAccountFilters) {
    const pattern = /[\s]*[\w\s]+#[\s]*[\w]+[\s]*/g;
    let found = name.match(pattern);
    let gameName = ''
    let tagLine = ''

    if (found) {
        // Split the input
        let input = name.split('#');
        gameName = input[0].trim();
        tagLine = input[1].trim();
        // Use the input as search query parameters for API calls


    } else {
        // Split the input
        let input = name.split('#');
        gameName = input[0].trim();
        tagLine = input.length > 1 ? input[1].trim() : '';
        // Use the input as search query parameters for API calls

    }


    const { data } = await axios.get('http://127.0.0.1:5000/api/accounts/search', { params: { region: region, name: gameName, tag: tagLine } })
    return data
}