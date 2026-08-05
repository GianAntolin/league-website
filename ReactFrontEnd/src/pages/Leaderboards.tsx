import { useEffect, useState } from 'react';
import './Leaderboards.css'
import { useSearchParams } from 'react-router-dom';

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
  // pattern for numbers
  const pattern = /^\s*[0-9]+\s*$/

  // Region selected
  const [selected, setSelected] = useState<string>('na1');

  // Queue type
  const [queueType, setQueue] = useState<string>('solo');

  // Navigation web buttons
  const [pageButtons, setPageButtons] = useState<Array<number>>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  // Controls if the drop down is hidden or visible 
  const [toggleOptions, setToggleOptions] = useState(false);

  // get query parameters
  const [params, setParams] = useSearchParams()
  const region = params.get('region') ?? 'na1';
  const queue = params.get('queue') ?? 'solo'
  const tempPage = params.get('page') ?? '1'
  const page = tempPage.trim().match(pattern) ? tempPage : '1'


  const { data, isLoading , isError, error } = useGetLeaderboards({ region, page, queue })


  const rangeLoop = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index)
  }

  // Update the query parameters based user input (ranked solo/ranked flex) and reset the page parameter
  const handleQueueButton = (queue: string) => {
    setQueue(queue)
    setParams((prev) => {
      prev.set('queue', queue)
      prev.delete('page')
      return prev
    })
  }

  // Update the query parameters based user input (regions) and reset the page parameter
  const handleRegionButton = (region: string) => {
    setSelected(region)
    setToggleOptions(false);
    setParams((prev) => {
      prev.set('region', region)
      prev.delete('page')
      return prev
    })

  }

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
    if (data === undefined) return setPageButtons([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const currPage = parseInt(page);

    if (data.maxPages > 10) {
      if (currPage > pageButtons[9]) {
        console.log('pageButton[9]: ', pageButtons[9])
        // Prevent buttons from going over the maxPages
        if (currPage < data.maxPages) {
          // Check if there's enough pages for 10 buttons
          if ((Math.floor(currPage / 10) + 1) * 10 < data.maxPages) {
            setPageButtons(rangeLoop((Math.floor(currPage / 10) * 10) + 1, (Math.floor(currPage / 10) + 1) * 10))
          } else {
            setPageButtons(rangeLoop((Math.floor(currPage / 10) * 10) + 1, data.maxPages))
          }
        }
      }

      if (currPage < pageButtons[0]) {
        if (currPage < 1) {
          setPageButtons(rangeLoop(1, data.maxPages))
        } else {
          const temp = (Math.floor(currPage / 10) - 1) * 10
          const start = temp === 0 ? 1 : temp
          setPageButtons(rangeLoop(start, Math.floor(currPage / 10) * 10))

        }
      }

    } else {
      setPageButtons(rangeLoop(1,data.maxPages))
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
      {!data && isLoading &&
        <div className='pending'>
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

        </div>

      }

      {data && <LeaderboardTable data={data} page={page} pageButtons={pageButtons} />}
      {isError && <ErrorLeaderboards message={`${error.response?.data}`} />}
    </div>
  )
}

export default Leaderboards;