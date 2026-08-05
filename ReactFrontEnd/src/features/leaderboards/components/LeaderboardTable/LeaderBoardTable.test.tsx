import { describe, it, expect } from "vitest"
import { screen, render, cleanup } from '@testing-library/react'
import LeaderboardTable from "./LeaderboardTable"
import { MemoryRouter, useLocation } from "react-router-dom"
import userEvent, { UserEvent } from '@testing-library/user-event'
import { LeaderboardsData } from "../../type"

function GetParams() {
    const location = useLocation()

    return (
        <div data-testid='location'>
            {location.search}
        </div>
    )
}



describe('LeaderboardBoardTable feauture', () => {
    let data: LeaderboardsData
    let isPending: boolean
    let page: string
    let pageButtons: number[]
    let user: UserEvent
    let rerender: (ui: React.ReactNode) => void

    beforeEach(() => {
        data = {
            "maxPages": 31,
            "profiles": {
                "1": {
                    "PUUID": "_HapVEF2AgqTZHAjq76upNuHp8jMXob_VEY_6eCO-H-k3cxbPx_Y0xDFPJvTQ29ZPzmMqlF7_LgfAw",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/5174.png",
                    "level": 487,
                    "losses": 252,
                    "lp": 3190,
                    "name": "never type",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 3190,
                    "rankSoloLosses": 252,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 441,
                    "region": "NA1",
                    "tag": "1998",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785357974000.0,
                    "wins": 441
                },
                "10": {
                    "PUUID": "SIybMVdu9RBD7WM_50tSwCn6sceFbpDmfdJPjIgM_sGsX3VixB1uy_SMBje6LQxl-p75oCe9bVO4wQ",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/5178.png",
                    "level": 724,
                    "losses": 331,
                    "lp": 2395,
                    "name": "Moss",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 2395,
                    "rankSoloLosses": 331,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 389,
                    "region": "NA1",
                    "tag": "LikeA",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785694285166.0,
                    "wins": 389
                },
                "2": {
                    "PUUID": "qL2_e-AaiKYQJLoP0dIzR5iTcVAEeiMtcbR-rMAHtfrgoKZoWBrRxSULJ5Iiq-ReNyFcwrZ-FqQsjg",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/23.png",
                    "level": 1084,
                    "losses": 333,
                    "lp": 2869,
                    "name": "Ablazeolive",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 2869,
                    "rankSoloLosses": 333,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 431,
                    "region": "NA1",
                    "tag": "NA1",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785698330987.0,
                    "wins": 431
                },
                "3": {
                    "PUUID": "2gljAn0ZFT-ryePXoOL3C3qXuNHIOvyXn1Uqpq4mQfedHfX0Bkpugo562FZAcQ4V7xxIUQ_pH7r5eg",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/508.png",
                    "level": 481,
                    "losses": 380,
                    "lp": 2799,
                    "name": "Davemon",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 2799,
                    "rankSoloLosses": 380,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 529,
                    "region": "NA1",
                    "tag": "NA1",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785657170000.0,
                    "wins": 529
                },
                "4": {
                    "PUUID": "OJT0WA_maRtYcdS-Y0ti6ruoqqrB_VUBv0yFHHZYNB-Mz2evOOA1QGy8XwGj7EkL-PPZsY9nD2nlKg",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/7187.png",
                    "level": 913,
                    "losses": 248,
                    "lp": 2564,
                    "name": "ENTHRALLED",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 2564,
                    "rankSoloLosses": 248,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 350,
                    "region": "NA1",
                    "tag": "999",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785659108000.0,
                    "wins": 350
                },
                "5": {
                    "PUUID": "6jJ7ASQ05NExlByYLCB9hFC5Hx8HgWwYCmbo1LjAwHZ1mQgB5zOWtrhKmsJgX3iiOoz0ioHzFQb0AA",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/6943.png",
                    "level": 874,
                    "losses": 299,
                    "lp": 2562,
                    "name": "MunchyPunchyLOL",
                    "rank": "I",
                    "rankFlexLP": 95,
                    "rankFlexLosses": 20,
                    "rankFlexRank": "I",
                    "rankFlexTier": "EMERALD",
                    "rankFlexTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Emerald.png",
                    "rankFlexWins": 16,
                    "rankSoloLP": 2562,
                    "rankSoloLosses": 299,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 387,
                    "region": "NA1",
                    "tag": "TTV1",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785634422000.0,
                    "wins": 387
                },
                "6": {
                    "PUUID": "RmLbx70TjosfKECrFjuugOc-YC86OAcaeSNELFSHeHbH0f9d-xH1ucg1wi7156QhKva5vRylwglgXA",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/1629.png",
                    "level": 308,
                    "losses": 186,
                    "lp": 2516,
                    "name": "Cole Caufield",
                    "rank": "I",
                    "rankFlexLP": 83,
                    "rankFlexLosses": 4,
                    "rankFlexRank": "II",
                    "rankFlexTier": "EMERALD",
                    "rankFlexTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Emerald.png",
                    "rankFlexWins": 5,
                    "rankSoloLP": 2516,
                    "rankSoloLosses": 186,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 305,
                    "region": "NA1",
                    "tag": "MTL",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785660228000.0,
                    "wins": 305
                },
                "7": {
                    "PUUID": "19sfE3qajniXH-hxd3jocWVnx_mQ8MQi0eHxSqkBGjRJult6KBLjskittWVlqtbadqd0O3Tc8iHKuw",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/590.png",
                    "level": 745,
                    "losses": 125,
                    "lp": 2510,
                    "name": "DARKWINGS",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 2510,
                    "rankSoloLosses": 125,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 204,
                    "region": "NA1",
                    "tag": "NA3",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785650761000.0,
                    "wins": 204
                },
                "8": {
                    "PUUID": "hPhnbeU43Mocc6EH-gFPcI5MxGYMU7-hrwI-oz55HOOVY-EBqMsCJcD27mVC55_xx3k33Y12gm3lvw",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/22.png",
                    "level": 309,
                    "losses": 166,
                    "lp": 2502,
                    "name": "twtv kaidojungle",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 2502,
                    "rankSoloLosses": 166,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 272,
                    "region": "NA1",
                    "tag": "IWNL",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785299169000.0,
                    "wins": 272
                },
                "9": {
                    "PUUID": "xb2MC0CYvzoKL8quBG3L-OfOoZagrOzvYcLODzJEQRGXldpFBsylxyb-gJ83mNKAiEYgvv0xEMUNow",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/3797.png",
                    "level": 585,
                    "losses": 258,
                    "lp": 2498,
                    "name": "always",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 2498,
                    "rankSoloLosses": 258,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 413,
                    "region": "NA1",
                    "tag": "91225",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785388761000.0,
                    "wins": 413
                }
            },
            "tier": "CHALLENGER"
        }
        isPending = false
        page = '1'
        pageButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        user = userEvent.setup()

        let temp = render(

            <MemoryRouter initialEntries={['/leaderboards?page=1']}>

                <LeaderboardTable data={data} isPending={isPending} page={page} pageButtons={pageButtons} />
                <GetParams />

            </MemoryRouter>

        )

        rerender = temp.rerender

    })

    it('pressing page buttons', async () => {
        let buttons = pageButtons


        for (const i of buttons) {
            const button = screen.getByRole('button', { name: String(i) })
            expect(
                button
            ).toBeInTheDocument()

            await user.click(button)
            console.log(`pressing button ${button.textContent}`)
            expect(

                screen.getByTestId('location')
            ).toHaveTextContent(`?page=${i}`)
            console.log(screen.getByTestId('location').textContent)
        }


    })

    it('presses next and prev buttons', async () => {

        //initial page is 1 => no prev button
        expect(
            screen.queryByRole('button', { name: 'Prev' })
        ).not.toBeInTheDocument()

        let button = screen.getByRole('button', { name: '5' })
        await user.click(button)

        let location = screen.getByTestId('location')

        console.log('Click 5')
        console.log(location.textContent)


        expect( 
            button
        ).toHaveTextContent('5')

        rerender(
            <MemoryRouter initialEntries={[`/leaderboards?page=5`]}>
                <LeaderboardTable data={data} isPending={isPending} page={'5'} pageButtons={pageButtons} />
                <GetParams />
            </MemoryRouter>
        )
        
        expect(
            screen.getByRole('button', { name: 'Prev' })
        ).toBeInTheDocument()

        let buttonPrev = screen.getByRole('button', { name: 'Prev' })
        await user.click(buttonPrev)        
        console.log('Click Prev')

        expect(
            location
        ).toHaveTextContent('?page=4')

        console.log(location.textContent)

        rerender(
            <MemoryRouter initialEntries={[`/leaderboards${location.textContent}`]}>
                <LeaderboardTable data={data} isPending={isPending} page={location.textContent!.replace(/[^0-9]/g, '')} pageButtons={pageButtons} />
                <GetParams />
            </MemoryRouter>
        )

        let buttonNext = screen.getByRole('button', {name: 'Next'})
        await user.click(buttonNext)
        console.log('Click Next')

        expect( 
            location
        ).toHaveTextContent('?page=5')

        console.log(location.textContent)


        console.log('Going to the max page => no next button')
        cleanup()
        render(
            <MemoryRouter initialEntries={[`/leaderboards?page=${data.maxPages}`]}>
                <LeaderboardTable data={data} isPending={isPending} page={String(data.maxPages)} pageButtons={pageButtons} />
                <GetParams />
            </MemoryRouter>
        )

        console.log(screen.getByTestId('location').textContent)

        expect( 
            screen.queryByRole('button', {name: 'next'})
        ).not.toBeInTheDocument()

    })


})
