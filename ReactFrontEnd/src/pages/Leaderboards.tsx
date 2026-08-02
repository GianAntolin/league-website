import { useEffect, useState } from 'react';
import './Leaderboards.css'
import { useLocation, useNavigate } from 'react-router-dom';

import LeaderboardTable from '@/features/leaderboards/components/LeaderboardTable/LeaderboardTable';
import DropDown from '@/components/DropDown';
import ErrorLeaderboards from './Error/ErrorLeaderboards';
import { regions, regionTags } from '@/constants/regions';
import { useGetLeaderboards } from '@/features/leaderboards/api/fetchLeaderboards';





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

  const navigate = useNavigate()

  // pattern for numbers
  const pattern = /^\s*[0-9]+\s*$/

  // Region selected
  const [selected, setSelected] = useState<string>('na1');

  // Queue type
  const [queueType, setQueue] = useState<string>('solo');

  // API endpoint
  // const [url, setURL] = useState<string>('');
  // API call for ranking data
  // const {data, isPending, error} = useFetch<LeaderboardsData>(url);

  // Navigation web buttons
  const [pageButtons, setPageButtons] = useState<Array<number>>([1,2,3,4,5,6,7,8,9])
  // Controls if the drop down is hidden or visible 
  const [toggleOptions, setToggleOptions] = useState(false);

  // get query parameters
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const region = queryParameters.get('region') ?? 'na1';
  const queue = queryParameters.get('queue') ?? 'solo'
  const tempPage = queryParameters.get('page') ?? '1'
  const page = tempPage.trim().match(pattern) ? tempPage : '1'

  const { data, isLoading: isPending, isError, error } = useGetLeaderboards({ region, page, queue })


  const rangeLoop = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index)
  }

  // Update the query parameters based user input (ranked solo/ranked flex) and reset the page paramete
  const handleQueueButton = (queue: string) => {
    setQueue(queue)
    const updateParams = new URLSearchParams(location.search);

    if (queueType) {
      updateParams.set('queue', queue)
    } else {
      updateParams.append('queue', queue)
    }

    updateParams.delete('page')

    navigate({ pathname: location.pathname, search: updateParams.toString() })
  }

  // Update the query parameters based user input (regions) and reset the page parameter
  const handleRegionButton = (region: string) => {
    setSelected(region)
    setToggleOptions(false);
    const updatedParams = new URLSearchParams(location.search)
    if (selected) {
      updatedParams.set('region', region)
    } else {
      updatedParams.append('region', region)
    }
    updatedParams.delete('page')
    navigate({ pathname: location.pathname, search: updatedParams.toString() })

  }

  // Error Handling: wrong parameters and missings parameters
  useEffect(() => {

    if (regionTags.includes(region.trim().toUpperCase())) {
      if (region != selected) setSelected(region.trim().toLowerCase())
    } 


    if (queue === 'flex' || queue === 'solo') {
      if (queue != queueType) {
        setQueue(queue)
      }
    }


  }, [page, region, queue])

  // Update the web navigation buttons according to the page number
  useEffect(() => {
    // Checking edge cases
    if (data === undefined) return setPageButtons([1,2,3,4,5,6,7,8,9]);
    // page can be null or an empty string set the page to 1
    let currPage;
    if (!page.match(pattern)) {
      currPage = 1;
    } else {
      currPage = parseInt(page);

    }


    // curr page exceed the maximum number of pages
    if (currPage > data.maxPages) return;

    else {
      // prevent the page numbers from going below 1 
      if (currPage > 3) {
        // prevent the page numberes from going above the max pages
        if (currPage + 5 > data.maxPages) {
          setPageButtons(rangeLoop(data.maxPages - 8, data.maxPages));
        } else {
          setPageButtons(rangeLoop(currPage - 3, currPage + 5));
        }
      } else {
        if (currPage + 5 > data.maxPages) {
          setPageButtons(rangeLoop(1, data.maxPages));
        } else {
          // Theres at least 9 buttons unless the max page is less than 9
          if (data.maxPages > 9) setPageButtons(rangeLoop(1, 9));
          else setPageButtons(rangeLoop(1, data.maxPages));
        }
      }
    }

  }, [data])


  useEffect(() => {
    document.title = 'Leaderboards'
  }, [])

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
            {toggleOptions &&
              <div className='leaderboards-drop-down'>
                <DropDown options={regions} handleSelected={handleRegionButton}></DropDown>
              </div>
            }

          </div>
          <div className='leadersboards-subheading1-div1'>
            <button
              style={{ backgroundColor: (queueType === 'solo' || queueType === null || queue === 'solo') ? '#070765' : '' }}
              onClick={() => handleQueueButton('solo')}>
              <span className='solo'>
                Ranked Solo
              </span>
            </button>
          </div>
          <div className='leadersboards-subheading1-div2'>
            <button
              style={{ backgroundColor: queue === 'flex' || queueType === 'flex' ? '#070765' : '' }}
              onClick={() => handleQueueButton('flex')}>
              <span className='flex'>
                Ranked Flex
              </span>
            </button>
          </div>
        </div>
      </div>
      {!data && isPending &&
        <div className='pending'>
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

        </div>

      }

      {data && <LeaderboardTable data={data} isPending={isPending} page={page} pageButtons={pageButtons} />}
      {isError && !data && !isPending && <ErrorLeaderboards message={`${error.response?.data}`} />}
    </div>
  )
}

export default Leaderboards;