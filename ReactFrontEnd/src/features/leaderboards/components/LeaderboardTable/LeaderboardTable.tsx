import { useSearchParams } from "react-router-dom";
import { LeaderboardsData } from '@/features/leaderboards/type'
import LeaderboardsMain from "./components/LeaderboardsMain/LeaderboardsMain";
import LeaderboardsPageX from "./components/LeaderboardsPageX";



interface LeaderboardsProps {
    data: LeaderboardsData,
    isPending: boolean,
    page: string,
    pageButtons: number[]
}

function LeaderboardTable({ data, isPending, page, pageButtons }: LeaderboardsProps) {
    const [, setParams] = useSearchParams()

    return (
        <div className='leaderboards-content'>
            {isPending &&
                <div className='pending'>
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>

                </div>}
            {!isPending && <div className='leaderboards-outlet'>
                {(page === '' || page === '1') && <LeaderboardsMain data={data} />}
                {page !== '' && parseInt(page) > 1 && <LeaderboardsPageX data={data} />}

                {pageButtons && <div className='leaderboards-page-navigation'>
                    <button
                        className='leaderboards-page-prev'
                        style={{ visibility: page === '1' ? 'hidden' : 'visible' }}
                        disabled={page === '1'}
                        onClick={() => {
                            const currPage = page === '' ? 1 : parseInt(page)
                            setParams((prev) => {
                                prev.set('page', (currPage - 1).toString())
                                return prev
                            })

                        }
                        }
                    > Prev </button>
                    <div className='leaderboards-page-buttons' data-testid='leaderboards-page-buttons'>
                        {pageButtons.map((currPage, index) => (
                            <button
                                className={`button button${index}`}
                                key={currPage}
                                onClick={() => {
                                    setParams((prev) => {
                                        prev.set('page', (currPage).toString())
                                        return prev
                                    })
                                }}
                                style={{
                                    textDecoration: parseInt(page) === currPage ? 'underline #3776fc' : '',
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
                            const currPage = page === '' ? 1 : parseInt(page)
                            setParams((prev) => {
                                prev.set('page', (currPage + 1).toString())
                                return prev
                            })
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