import { useState, useEffect} from "react";

/**
 * 
 * @param url : string - API endpoint
 * @returns data fetched from API endpoint, status conditions: isPending and error
 * 
 * Custom Hook that sends get requests. It will send get requests if the url is changed.
 */
function useFetch<T>(url: string){
    const [data, setData] = useState<T | null>(null);
    const [error , setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    
    const fetchData = async () => {
      try {
        setIsPending(true);
        const response = await fetch(url)
        if (!response.ok){
          if (response.status === 404) {
            const errorMsg = await response.json()
            throw new Error(errorMsg)
          }
          throw new Error(`Error: ${response.statusText}`);
          
        }
        const responseData = await response.json()
        setData(responseData);
        setError(null)
      } catch (err : any) {
        setError(err.message)
        setData(null)
      } finally {
        setIsPending(false)
      }
      
    }
    // send a get request every time the url changes
    useEffect( () => {
        if (url === null || url === '') return

        console.log('@ hook: ', url)
        //Asynchronous request
        fetchData();


      }, [url]);


    return { data, isPending, error}
}

export default useFetch;