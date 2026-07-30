import { useEffect, useState } from 'react';
import './Leaderboards.css'
import {useLocation, useNavigate } from 'react-router-dom';

import LeaderboardTable from '@/features/leaderboards/components/LeaderboardTable/LeaderboardTable';
import useFetch from '@/hooks/useFetch';
import DropDown from '@/components/DropDown';
import ErrorLeaderboards from './Error/ErrorLeaderboards';
import { LeaderboardsData } from '@/features/leaderboards/type';
import { regions, regionTags } from '@/constants/regions';





/**
 * Serves as the layout for leaderboards content. 
 * Make API calls to get leaderboards rankings and the corresponding player
 * Display the rankings of 10 players in sequential order, ith to (i+9)th player
 * Data display will be handled by either LeaderboardsMain (index/page 1) or LeaderboardsPageX (page 2-X)
 * User selects a ranked type: default is ranked solo
 * If the ranked type is changed, it will reset to 'page' parameter to null
 * If the region is changed, it will reset the 'page' paramter to null
 * Utilize query parameters and state variables "selected" and "queueType" to determine the API endpoint
 * Bottom of the page will display a dynamic web page navigation buttons that'll depend on the current page number
 */

function Leaderboards() {
  const baseURL = 'http://127.0.0.1:5000/api/leaderboards'; 
  
  
  const navigate = useNavigate()
  // pattern for numbers
  const pattern = /^\s*[0-9]+\s*$/g     

  // Region selected
  const [selected, setSelected] = useState<string> ('na1');

  // Queue type
  const [queueType, setQueue] = useState<string>('solo');
  
  // API endpoint
  const [url, setURL] = useState<string>('');
  // API call for ranking data
  const {data, isPending, error} = useFetch<LeaderboardsData>(url);

  // Navigation web buttons
  const [pageButtons, setPageButtons] = useState<Array<number> | null>(null)
  // Controls if the drop down is hidden or visible 
  const [toggleOptions, setToggleOptions] = useState(false);

  // get query parameters
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const region = queryParameters.get('region');
  const page = queryParameters.get('page')
  const queue = queryParameters.get('queue')


  const rangeLoop = (start: number, end: number) => {
    return Array.from({length: end - start + 1}, (_, index) => start+index)
  }

  // Update the query parameters based user input (ranked solo/ranked flex) and reset the page paramete
  const handleQueueButton = (queue: string) => {
    setQueue(queue)
    const updateParams = new URLSearchParams(location.search);

    if (queueType) {
      updateParams.set('queue', queue)
    } else{
      updateParams.append('queue', queue)
    }

    updateParams.delete('page')

    navigate({pathname: location.pathname, search: updateParams.toString()})
  }

  // Update the query parameters based user input (regions) and reset the page parameter
  const handleRegionButton = (region: string) =>{ 
    setSelected(region)
    setToggleOptions(false);
    const updatedParams = new URLSearchParams(location.search)
    if (selected){
      updatedParams.set('region', region)
    } else{
      updatedParams.append('region', region)
    }
    updatedParams.delete('page')
    navigate({pathname: location.pathname, search: updatedParams.toString()})

  }
  
  // Check the parameters
  // Error Handling: wrong parameters and missings parameters
  // Send an API fetch based on the query parameters
  useEffect( () => {
    let urlTemp = baseURL;
    // Search parameters: region
    if (region){
      // Check if the region is valid
      if (regionTags.includes(region.toUpperCase())){
        if (region != selected) {
          setSelected(region.toLocaleLowerCase());
        }
        urlTemp += `/${region.toLocaleLowerCase()}`;

      } else{
        // Default to 'NA1'
        setSelected('na1');
        urlTemp += '/na1';
        
      }
    } else{
      if (selected === null) {
        setSelected('na1');
        urlTemp += '/na1';
      }else urlTemp += `/${selected.toLocaleLowerCase()}`;
    }

    if (queue){
      // Check if the queue is valid. default to solo 
      if (queue === 'flex'){
        setQueue('flex');
        urlTemp += '/flex';
      } else{
        if (queue != queueType) {
          setQueue('solo');
        }
        urlTemp += '/solo';
      }
    } else{
      if (queueType === null){
        setQueue('solo');
        urlTemp += '/solo';
      }else urlTemp += `/${queueType}`;
    }

    // Search parameters: page
    if (page){
      // Check if the page is valid
      if (page.match(pattern)){
        urlTemp += `/${ (parseInt(page) - 1) * 10}/${(parseInt(page) * 10)}`;

      } else{
        // Default to start = 0, end = 10
        urlTemp += `/0/10`;
      }
    } else{
      urlTemp += `/0/10`;
    }
    setURL(urlTemp);

  },[region, queue, page])

  // Update the web navigation buttons according to the page number
  useEffect( () => {
    // Checking edge cases
    if (data === null) return setPageButtons(null);
    // page can be null or an empty string set the page to 1
    let currPage;
    if (page === null || page === '') {
      currPage = 1;
    } else {
      currPage = parseInt(page);

    }


    // curr page exceed the maximum number of pages
    if (currPage > data.maxPages) return;

    else {
      // prevent the page numbers from going below 1 
      if (currPage > 3){
        // prevent the page numberes from going above the max pages
        if (currPage + 5 > data.maxPages) {
          setPageButtons(rangeLoop(data.maxPages-8, data.maxPages));
        } else{
          setPageButtons(rangeLoop(currPage - 3, currPage + 5));
        }
      } else{
        if (currPage + 5 > data.maxPages) {
          setPageButtons(rangeLoop(1, data.maxPages));
        } else{
          // Theres at least 9 buttons unless the max page is less than 9
          if (data.maxPages > 9) setPageButtons(rangeLoop(1, 9));
          else setPageButtons(rangeLoop(1, data.maxPages));
        }
      }
    }   



  }, [data])
  

  useEffect( () => {
    document.title = 'Leaderboards'
  },[])

  
  return (
    <div className='leaderboards'>
      <div className='leaderboards-header'>
        <div className='leaderboards-title'>
          <span>
            Leaderboards
          </span>
        </div>
        <div className='leadersboards-subheading1'>
          <div className="leaderboards-section1">
            <button
                onClick={() => setToggleOptions(!toggleOptions)}
                >
                {selected === null ? regions[0].label : regions[regionTags.indexOf(selected.toLocaleUpperCase())].label}
            </button>
            { toggleOptions &&
              <div className='leaderboards-drop-down'>
                <DropDown options = {regions} handleSelected={handleRegionButton}></DropDown>
              </div>
            }

          </div>
          <div className='leadersboards-subheading1-div1'>
            <button
              style = {{backgroundColor: (queueType === 'solo' || queueType === null || queue === 'solo') ? '#070765' : ''}}
              onClick = { () => handleQueueButton('solo')}>
                <span className='solo'>
                  Ranked Solo
                </span>
            </button>
          </div>  
          <div className='leadersboards-subheading1-div2'>
            <button
              style = {{backgroundColor: queue === 'flex' || queueType === 'flex'? '#070765' : ''}}
              onClick = { () => handleQueueButton('flex')}>
                <span className='flex'>
                  Ranked Flex
                </span>
            </button>
          </div>
        </div>
      </div>
      { !data && isPending && 
        <div className='pending'>
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

        </div>
      
      }

      {data && <LeaderboardTable data = {data} isPending={isPending} page ={page} pageButtons={pageButtons}/>}
      {error && !data &&!isPending && <ErrorLeaderboards message ={`${error}`}/>}
    </div>
  )
}

export default Leaderboards;