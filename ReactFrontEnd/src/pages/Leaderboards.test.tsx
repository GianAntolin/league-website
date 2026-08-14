import axios, { AxiosError } from 'axios'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { vi, describe, expect } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import AppLayout from '@/layouts/AppLayout'
import Leaderboards from './Leaderboards'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { leaderBoardsMockResponse } from '@/shared/testData'
import userEvent from '@testing-library/user-event'
import { buildParams } from '@/shared/testFunctions'

function GetParams() {
    const location = useLocation()
    return <div data-testid='location'> {`${location.pathname}${location.search}`} </div>
}

interface LeaderBoardsWrapperProps {
    path: string[]
}

function LeaderboardsWrapper({ path }: LeaderBoardsWrapperProps) {
    return (
        <MemoryRouter initialEntries={path}>
            <Routes>
                <Route path='' element={<AppLayout />}>
                    <Route path='leaderboards' element={<Leaderboards />} />
                </Route>
            </Routes>
            <GetParams />
        </MemoryRouter>
    )
}


describe('Leaderboards page', () => {
    beforeEach(() => {
        vi.spyOn(axios, 'get').mockImplementation(async (url, config) => {
            if (config?.params) {
                const queryParams = buildParams(config.params as Record<string, unknown>)
                if (queryParams in leaderBoardsMockResponse) {
                    return Promise.resolve(leaderBoardsMockResponse[queryParams])
                }
                else {
                    const error = new AxiosError(
                        'Request Failed',
                        AxiosError.ERR_BAD_REQUEST,
                        {} as any,
                        {},
                        {
                            data: { message: 'No data found' },
                            status: 400,
                            statusText: 'Bad Request',
                            headers: {},
                            config: {} as any,
                        }
                    );
                    throw error
                }
            }
        })
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('displays default leaderboards', async () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false }
            }
        })
        render(
            <QueryClientProvider client={queryClient}>
                <LeaderboardsWrapper path={['/leaderboards']} />
            </QueryClientProvider>
        )

        const top3 = await screen.findAllByTestId('leaderboards-top-section')
        expect(top3.length).toBe(3)
        const leaderboardProfiles = await screen.findAllByTestId('leaderboards-profile')
        expect(leaderboardProfiles.length).toBe(7)

        const pageButtons = within(screen.getByTestId('leaderboards-page-buttons')).getAllByRole('button')
        expect(pageButtons.length).toBe(10)

        let start = 1
        const buttonNumber = '1'
        for (const i of pageButtons) {
            expect(i.textContent).toBe(String(start))
            if (i.textContent === buttonNumber) {
                expect(i).toHaveStyle({ textDecoration: 'underline #3776fc' })
            }
            else expect(i).not.toHaveStyle({ textDecoration: 'underline #3776fc' })
            start++
        }
    })

    it('describes leaders with only page parameter', async () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false }
            }
        })
        render(
            <QueryClientProvider client={queryClient}>
                <LeaderboardsWrapper path={['/leaderboards?page=7']} />
            </QueryClientProvider>
        )

        const leaderboardProfiles = await screen.findAllByTestId('leaderboards-profile')
        expect(leaderboardProfiles.length).toBe(10)

        const pageButtons = within(screen.getByTestId('leaderboards-page-buttons')).getAllByRole('button')
        expect(pageButtons.length).toBe(10)

        let start = 1
        const currPage = '7'
        for (const button of pageButtons) {
            expect(button.textContent).toBe(String(start))
            if (button.textContent === currPage) {
                expect(button).toHaveStyle({ textDecoration: 'underline #3776fc' })
            }
            else expect(button).not.toHaveStyle({ textDecoration: 'underline #3776fc' })
            start++
        }
    })

    it('updates page buttons based on page numeer', async () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false }
            }
        })
        render(
            <QueryClientProvider client={queryClient}>
                <LeaderboardsWrapper path={['/leaderboards?page=17']} />
            </QueryClientProvider>
        )


        const profiles = await screen.findAllByTestId('leaderboards-profile')
        expect(profiles.length).toBe(10)

        const top3 = screen.queryAllByTestId('leaderboards-top-section')
        expect(top3.length).toBe(0)

        const pageButtons = within(screen.getByTestId('leaderboards-page-buttons')).getAllByRole('button')
        expect(pageButtons.length).toBe(10)

        let start = 11
        const currPage = '17'

        for (const button of pageButtons) {
            expect(button.textContent).toBe(String(start))
            if (button.textContent == currPage) {
                expect(button).toHaveStyle({ textDecoration: 'underline #3776fc' })
            } else expect(button).not.toHaveStyle({ textDecoration: 'underline #3776fc' })
            start++
        }


    })


    it('goes to the last set of pages', async () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false }
            }
        })
        render(
            <QueryClientProvider client={queryClient}>
                <LeaderboardsWrapper path={['/leaderboards?page=31']} />
            </QueryClientProvider>
        )

        const profiles = await screen.findAllByTestId('leaderboards-profile')
        expect(profiles.length).toBe(2)

        const top3 = screen.queryAllByTestId('leaderboards-top-section')
        expect(top3.length).toBe(0)


        const pageButtons = within(screen.getByTestId('leaderboards-page-buttons')).getAllByRole('button')
        expect(pageButtons.length).toBe(1)
    })

    it('goes to the 2nd to last set of pages', async () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false }
            }
        })
        render(
            <QueryClientProvider client={queryClient}>
                <LeaderboardsWrapper path={['/leaderboards?page=30']} />
            </QueryClientProvider>
        )


        const profiles = await screen.findAllByTestId('leaderboards-profile')
        expect(profiles.length).toBe(10)

        const top3 = screen.queryAllByTestId('leaderboards-top-section')
        expect(top3.length).toBe(0)

        const pageButtons = within(screen.getByTestId('leaderboards-page-buttons')).getAllByRole('button')
        expect(pageButtons.length).toBe(10)

        let start = 21
        const currPage = '30'

        for (const button of pageButtons) {
            expect(button.textContent).toBe(String(start))
            if (button.textContent == currPage) {
                expect(button).toHaveStyle({ textDecoration: 'underline #3776fc' })
            } else expect(button).not.toHaveStyle({ textDecoration: 'underline #3776fc' })
            start++
        }
    })

    it('checks page = 0', async () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false }
            }
        })
        render(
            <QueryClientProvider client={queryClient}>
                <LeaderboardsWrapper path={['/leaderboards?page=0']} />
            </QueryClientProvider>
        )

        const top3 = await screen.findAllByTestId('leaderboards-top-section')
        expect(top3.length).toBe(3)

        const profiles = await screen.findAllByTestId('leaderboards-profile')
        expect(profiles.length).toBe(7)

        const pageButtons = within(screen.getByTestId('leaderboards-page-buttons')).getAllByRole('button')
        expect(pageButtons.length).toBe(10)

        let start = 1
        const currPage = '1'

        for (const button of pageButtons) {
            expect(button.textContent).toBe(String(start))
            if (button.textContent == currPage) {
                expect(button).toHaveStyle({ textDecoration: 'underline #3776fc' })
            } else expect(button).not.toHaveStyle({ textDecoration: 'underline #3776fc' })
            start++
        }
    })


    it('checks page is a negative number', async () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false }
            }
        })
        render(
            <QueryClientProvider client={queryClient}>
                <LeaderboardsWrapper path={['/leaderboards?page=-5']} />
            </QueryClientProvider>
        )

        const top3 = await screen.findAllByTestId('leaderboards-top-section')
        expect(top3.length).toBe(3)

        const profiles = await screen.findAllByTestId('leaderboards-profile')
        expect(profiles.length).toBe(7)

        const pageButtons = within(screen.getByTestId('leaderboards-page-buttons')).getAllByRole('button')
        expect(pageButtons.length).toBe(10)

        let start = 1
        const currPage = '1'

        for (const button of pageButtons) {
            expect(button.textContent).toBe(String(start))
            if (button.textContent == currPage) {
                expect(button).toHaveStyle({ textDecoration: 'underline #3776fc' })
            } else expect(button).not.toHaveStyle({ textDecoration: 'underline #3776fc' })
            start++
        }
    })

    it('shows Error Page', async () => {

        const queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false }
            }
        })
        render(
            <QueryClientProvider client={queryClient}>
                <LeaderboardsWrapper path={['/leaderboards?page=32']} />
            </QueryClientProvider>
        )

        expect(await screen.findByText('No data found')).toBeInTheDocument();

    })

    it('clicks the queue types buttons and dropdown region buttons', async () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false }
            }
        })
        render(
            <QueryClientProvider client={queryClient}>
                <LeaderboardsWrapper path={['/leaderboards?region=LA1&page=5']} />
            </QueryClientProvider>
        )

        const user = userEvent.setup()
        const rankedSoloButton = screen.getByTestId('leaderboards-ranked-solo-button')
        const rankedFlexButton = screen.getByTestId('leaderboards-ranked-flex-button')
        const regionsDropDownButton = screen.getByTestId('leaderboards-regions-drop-down-button')

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/api/leaderboards', { params: { region: 'la1', queue: 'solo', start: '40', end: '50' } })
        })

        await user.click(rankedFlexButton)
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/api/leaderboards', { params: { region: 'la1', queue: 'flex', start: '0', end: '10' } })
        })

        await user.click(rankedSoloButton)
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/api/leaderboards', { params: { region: 'la1', queue: 'solo', start: '0', end: '10' } })
        })

        await user.click(regionsDropDownButton)
        const dropDown = screen.getByTestId('leaderboards-drop-down')
        const regionKR = within(dropDown).getByText('KR')
        await user.click(regionKR)

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/api/leaderboards', { params: { region: 'kr', queue: 'solo', start: '0', end: '10' } })
        })


    })



})