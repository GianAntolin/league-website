import AppLayout from '@/layouts/AppLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import axios, { AxiosError } from 'axios'
import { buildParams } from '@/shared/testFunctions'
import { accountSearchMockResponse } from '@/shared/testData'
import userEvent from '@testing-library/user-event'

function checkSuggestions(url: Record<string, unknown>, suggestions: HTMLElement[]) {
    const params = buildParams(url)
    if (params in accountSearchMockResponse) {
        const response = accountSearchMockResponse[params]
        const data = response['data']
        let start = 0
        for (const suggestion of suggestions){
            const suggestionDisplay = within(suggestion)
            expect(suggestionDisplay.getByRole('img')).toHaveAttribute('src', data[start]['icon'])
            expect(suggestion).toHaveTextContent(`${data[start]['name']} #${data[start]['tag']}`)
            start++
        }
    }

}
interface SearchBarWrapperProps {
    path: string[]
}


function SearchBarWrapper({ path }: SearchBarWrapperProps) {
    return (
        <MemoryRouter initialEntries={path}>
            <Routes>
                <Route path='' element={<AppLayout />} />
            </Routes>

        </MemoryRouter>
    )
}

describe('search bar', () => {

    beforeEach(() => {
        vi.spyOn(axios, 'get').mockImplementation(async (url, config) => {
            if (config?.params) {
                const queryParams = buildParams(config.params as Record<string, unknown>)
                if (queryParams in accountSearchMockResponse) {
                    return Promise.resolve(accountSearchMockResponse[queryParams])
                } else {
                    const error = new AxiosError(
                        'Request Failed',
                        'ERR_BAD_REQUEST',
                        {} as any,
                        {},
                        {
                            data: { message: 'Mising name' },
                            status: 404,
                            statusText: 'Bad Request',
                            headers: {},
                            config: {} as any,
                        }
                    )
                    throw error
                }
            }
        })
    })
    afterEach(() => {
        vi.clearAllMocks()
    })

    it('gives search results', async () => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false }
            }
        })

        render(
            <QueryClientProvider client={queryClient}>
                <SearchBarWrapper path={['']} />
            </QueryClientProvider>
        )

        await waitFor(() =>
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/api/accounts/search', { params: { region: 'NA1', name: '', tag: '' } })
        )
        expect(screen.queryAllByTestId('search-bar-suggestions')).toHaveLength(0)

        const searchbar = screen.getByTestId('search-bar-form')
        const user = userEvent.setup()
        await user.type(searchbar, 't')

        await waitFor(() =>
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/api/accounts/search', { params: { region: 'NA1', name: 't', tag: '' } })
        )
        let suggestions = await screen.findAllByTestId('search-bar-suggestions')
        expect(suggestions).toHaveLength(3)

        checkSuggestions({ region: 'NA1', name: 't', tag: '' }, suggestions)

        await user.type(searchbar, 'a')

        await waitFor(() =>
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/api/accounts/search', { params: { region: 'NA1', name: 'ta', tag: '' } })
        )
        suggestions = await screen.findAllByTestId('search-bar-suggestions')
        expect(suggestions).toHaveLength(3)

        checkSuggestions({ region: 'NA1', name: 'ta', tag: '' }, suggestions)

        await user.type(searchbar, '{Backspace}')

        await waitFor(() =>
            expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/api/accounts/search', { params: { region: 'NA1', name: 't', tag: '' } })
        )
        suggestions = await screen.findAllByTestId('search-bar-suggestions')
        expect(suggestions).toHaveLength(3)

        checkSuggestions({ region: 'NA1', name: 't', tag: '' }, suggestions)
    })
})