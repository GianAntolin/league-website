import { useNavigate } from "react-router-dom";
import { LeaderboardsData } from '@/features/leaderboards/type'
import LeaderboardsMain from "./components/LeaderboardsMain/LeaderboardsMain";
import LeaderboardsPageX from "./components/LeaderboardsPageX";



interface LeaderboardsProps {
    data: LeaderboardsData,
    isPending: boolean,
    page: string | null,
    pageButtons: number[] | null
}

function LeaderboardTable({ data, isPending, page, pageButtons }: LeaderboardsProps) {
    const navigate = useNavigate()
    return (
        <div className='leaderboards-content'>
            {isPending &&
                <div className='pending'>
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>

                </div>}
            {!isPending && <div className='leaderboards-outlet'>
                {(page === null || page === '' || page === '1') && <LeaderboardsMain data={data} />}
                {page !== null && page !== '' && parseInt(page) > 1 && <LeaderboardsPageX data={data} />}

                {pageButtons && <div className='leaderboards-page-navigation'>
                    <button
                        className='leaderboards-page-prev'
                        style={{ visibility: page === null || page === '1' ? 'hidden' : 'visible' }}
                        disabled={page === '1'}
                        onClick={() => {
                            const currPage = page === null || page === '' ? 1 : parseInt(page)
                            const updateParams = new URLSearchParams(location.search);
                            updateParams.set('page', (currPage - 1).toString())
                            navigate({ pathname: location.pathname, search: updateParams.toString() })
                        }
                        }
                    > Prev </button>
                    <div className='leaderboards-page-buttons'>
                        {pageButtons.map((currPage, index) => (
                            <button
                                className={`button button${index}`}
                                key={currPage}
                                onClick={() => {
                                    const updateParams = new URLSearchParams(location.search);
                                    updateParams.set('page', currPage.toString())
                                    navigate({ pathname: location.pathname, search: updateParams.toString() });
                                }}
                                style={{
                                    textDecoration:
                                        ((page === null ? 1 : (parseInt(page))) === currPage) ? 'underline #3776fc' : '',
                                    textUnderlineOffset: '0.25rem', textDecorationThickness: '0.125rem'
                                }}
                            >
                                {currPage}
                            </button>
                        )
                        )}
                    </div>
                    <button
                        className='leaderboards-page-next'
                        style={{ visibility: page === data.maxPages.toString() ? 'hidden' : 'visible' }}
                        disabled={page === data.maxPages.toString()}
                        onClick={() => {
                            const currPage = page === null || page === '' ? 1 : parseInt(page)
                            const updateParams = new URLSearchParams(location.search);
                            updateParams.set('page', (currPage + 1).toString())
                            navigate({ pathname: location.pathname, search: updateParams.toString() })
                        }
                        }>
                        Next </button>
                </div>}
            </div>
            }
        </div>


    )
}

export default LeaderboardTable