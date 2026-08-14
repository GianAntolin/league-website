import AppLayout from '@/layouts/AppLayout'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import Account from './Account'
import axios, { AxiosError } from 'axios'
import { buildParams } from '@/shared/testFunctions'
import { accountMockResponse, matchesMockresponse, RecentGamesMockResponse } from '@/shared/testData'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

interface AccountWrapperProps {
    path: string[]
}


function AccountWrapper({ path }: AccountWrapperProps) {

    return (<MemoryRouter initialEntries={path}>
        <Routes>
            <Route path='' element={<AppLayout />}>
                <Route path='/accounts/:region/:gameName/:tagLine' element={<Account />} />
            </Route>
        </Routes>
    </MemoryRouter>)
}

describe('account page', () => {
    beforeEach(() => {
        vi.spyOn(axios, 'get').mockImplementation(async (url, config) => {
            if (config?.params) {
                const queryParams = buildParams(config.params as Record<string, unknown>)
                switch (url) {
                    case 'http://127.0.0.1:5000/api/accounts':
                        if (queryParams in accountMockResponse) {
                            return Promise.resolve(accountMockResponse[queryParams])
                        } else {
                            const params = config.params as Record<string, unknown>
                            const name = `${params['name']}#${params['tag']}`
                            const error = new AxiosError(
                                'Request Failed',
                                AxiosError.ERR_BAD_REQUEST,
                                {} as any,
                                {},
                                {
                                    data: { message: `No search results for ${name}` },
                                    status: 404,
                                    statusText: 'Bad Request',
                                    headers: {},
                                    config: {} as any,
                                }
                            );
                            throw error
                        }
                        break

                    case 'http://127.0.0.1:5000/api/matches':
                        if (queryParams in matchesMockresponse) {
                            return Promise.resolve(matchesMockresponse[queryParams])
                        }
                        break
                    case 'http://127.0.0.1:5000/api/matches/champions':
                        if (queryParams in RecentGamesMockResponse) {
                            return Promise.resolve(RecentGamesMockResponse[queryParams])
                        }
                        break
                }
            }
        })

        const queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false }
            }
        })

        render(
            <QueryClientProvider client={queryClient}>
                <AccountWrapper path={['/accounts/NA1/never type/1998']} />
            </QueryClientProvider>
        )

    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('does account header and rank summary', async () => {

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/api/accounts', { params: { region: 'NA1', name: 'never type', tag: '1998' } })
        })


        const header = await screen.findByTestId('account-content-section-1-header')
        expect(header).toHaveTextContent('NEVER TYPE #1998')
        expect(header).toHaveTextContent('489')

        const rankSolo = await screen.findByTestId('account-content-section-2-ranks-solo')
        const rankFlex = await screen.findByTestId('account-content-section-2-ranks-flex')
        expect(rankSolo).toHaveTextContent('CHALLENGER')
        expect(rankSolo).toHaveTextContent('3196 LP')
        expect(rankSolo).toHaveTextContent('63% WR')
        expect(rankSolo).toHaveTextContent('451 W 261 L')
        expect(rankFlex).toHaveTextContent('Unranked')
    })

    it('shows match history metrics', async () => {


        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/api/matches/champions', { params: { region: 'NA1', PUUID: "_HapVEF2AgqTZHAjq76upNuHp8jMXob_VEY_6eCO-H-k3cxbPx_Y0xDFPJvTQ29ZPzmMqlF7_LgfAw", start: 1786418205260, end: 1786433120417 } })
        })

        const matchHistory = await screen.findByTestId('match-history-container')
        const matchHistoryStats = within(matchHistory).getByTestId("match-history-stats-content")
        expect(matchHistoryStats).toHaveTextContent('40%')
        expect(matchHistoryStats).toHaveTextContent('2W - 3L')

        const recentGames = await screen.findAllByTestId('recent-games-champions')

        const queryParams = buildParams({ region: 'NA1', PUUID: "_HapVEF2AgqTZHAjq76upNuHp8jMXob_VEY_6eCO-H-k3cxbPx_Y0xDFPJvTQ29ZPzmMqlF7_LgfAw", start: 1786418205260, end: 1786433120417 })
        const response = RecentGamesMockResponse[queryParams]
        const championsNames = Object.keys(response['data'])
        let start = 0
        for (const champions of recentGames) {
            const championData = response['data'][championsNames[start]]
            const kda = parseFloat(((championData['kills'] + championData['assists']) / (championData['deaths'] ? championData['deaths'] : 1)).toFixed(2))
            const winRate = Math.round((championData['wins'] / championData['games']) * 100);
            expect(within(champions).getByRole('img')).toHaveAttribute('src', championData['championPic'])
            expect(champions).toHaveTextContent(`${kda}`)
            expect(champions).toHaveTextContent(`${winRate}`)
            start++
        }


    })

    it('shows matches', async () => {
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/api/matches', { params: { region: 'NA1', PUUID: "_HapVEF2AgqTZHAjq76upNuHp8jMXob_VEY_6eCO-H-k3cxbPx_Y0xDFPJvTQ29ZPzmMqlF7_LgfAw", start: 0, count: '5' } })
        })

        const matchesHTML = await screen.findAllByTestId('match-top-level')
        expect(matchesHTML).toHaveLength(5)

        const queryParams = buildParams({ region: 'NA1', PUUID: "_HapVEF2AgqTZHAjq76upNuHp8jMXob_VEY_6eCO-H-k3cxbPx_Y0xDFPJvTQ29ZPzmMqlF7_LgfAw", start: 0, count: '5' })
        const response = matchesMockresponse[queryParams]
        const matches = response['data']['matches']
        let start = 0
        for (const matchHTML of matchesHTML) {
            const match = matches[`match${start}`]
            const participants: Record<string, unknown>[] = Object.values(match['participants'])
            const teamList = within(matchHTML).getByTestId('team-list')
            const teamListImgs = within(teamList).getAllByRole('img')
            const teamListSrcs = teamListImgs.map((img) => img.getAttribute('src')) as string[]
            expect(Object.keys(participants)).toHaveLength(10)
            expect(teamListSrcs).toHaveLength(10)

            let participantNumber = 0
            for (const participant of participants) {
                if (String(participantNumber) === match['mainParticipant']) {
                    const profileImg = participant['championPic']
                    const summonerKeyStoneURL = participant['summonerKeyStoneURL']
                    const summonerSecondaryRuneTypeURL = participant['summonerSecondaryRuneTypeURL']
                    const summonerSpell1URL = participant['summonerSpell1URL']
                    const summonerSpell2URL = participant['summonerSpell2URL']
                    const items = Object.values(participant['items'] as Record<string, string>)
                    const expectedImgs = [...items, profileImg, summonerKeyStoneURL, summonerSecondaryRuneTypeURL, summonerSpell1URL, summonerSpell2URL]
                    const images = within(matchHTML).getAllByRole('img')
                    const imgSrc = images.map((img) => img.getAttribute('src')) as string[]
                    expect(imgSrc).toEqual(expect.arrayContaining(expectedImgs));

                }

                expect(teamList).toHaveTextContent(`${participant['participantName']}`)
                expect(teamListSrcs).toContain(`${participant['championPic']}`)
                participantNumber++
            }
            start++
        }

    })

    it('clicks the show more button', async() => {

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/api/matches', { params: { region: 'NA1', PUUID: "_HapVEF2AgqTZHAjq76upNuHp8jMXob_VEY_6eCO-H-k3cxbPx_Y0xDFPJvTQ29ZPzmMqlF7_LgfAw", start: 0, count: '5' } })
        })

        const user = userEvent.setup()
        const showmoreButton = await screen.findByTestId('match-history-show-more-button')
        const matches = await screen.findAllByTestId('match-top-level')
        expect(matches).toHaveLength(5)
        await user.click(showmoreButton)

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/api/matches', { params: { region: 'NA1', PUUID: "_HapVEF2AgqTZHAjq76upNuHp8jMXob_VEY_6eCO-H-k3cxbPx_Y0xDFPJvTQ29ZPzmMqlF7_LgfAw", start: 5, count: '5' } })
        })

        const matches2 = await screen.findAllByTestId('match-top-level')
        expect(matches2).toHaveLength(10)

    })

    it('shows account not found', async() => {
        cleanup()
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false }
            }
        })

        render(
            <QueryClientProvider client={queryClient}>
                <AccountWrapper path={['/accounts/NA1/error/here']} />
            </QueryClientProvider>
        )

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/api/accounts', { params: { region: 'NA1', name: 'error', tag: 'here' } })
        })
        
        expect(await screen.findByTestId('account')).toHaveTextContent('HTTP 404: No search results for error#here')

    })


})