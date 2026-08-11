import axios, { AxiosError } from 'axios'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { vi, describe, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import AppLayout from '@/layouts/AppLayout'
import Leaderboards from './Leaderboards'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// vi.mock('axios')

// const {AxiosError} = await vi.importActual<typeof import('axios')>('axios')

function GetParams() {
    const location = useLocation()
    return <div data-testid='location'> {`${location.pathname}/${location.search}`} </div>
}

interface LeaderBoardsWrapperProps {
    path: string[]
}

function LeaderboardsWrapper({ path }: LeaderBoardsWrapperProps) {
    console.log('wrapper: ', path)
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


const leaderBoardsResponse: Record<string, unknown> = {
    'end=10&queue=solo&region=na1&start=0': {
        data: {
            "maxPages": 31,
            "profiles": {
                "1": {
                    "PUUID": "_HapVEF2AgqTZHAjq76upNuHp8jMXob_VEY_6eCO-H-k3cxbPx_Y0xDFPJvTQ29ZPzmMqlF7_LgfAw",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/5174.png",
                    "level": 488,
                    "losses": 256,
                    "lp": 3236,
                    "name": "never type",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 3236,
                    "rankSoloLosses": 256,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 447,
                    "region": "NA1",
                    "tag": "1998",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785744961000.0,
                    "wins": 447
                },
                "10": {
                    "PUUID": "w6ymwuoUe37__k4EHU7O6Pnuo0CZ4GDvOHH2FaTsueJIzlkFbPtAqTBrDdg3FMHPJeVIMZuFD32YIQ",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/1438.png",
                    "level": 383,
                    "losses": 120,
                    "lp": 2379,
                    "name": "Cupic",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 2379,
                    "rankSoloLosses": 120,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 242,
                    "region": "NA1",
                    "tag": "Senna",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785728385000.0,
                    "wins": 242
                },
                "2": {
                    "PUUID": "qL2_e-AaiKYQJLoP0dIzR5iTcVAEeiMtcbR-rMAHtfrgoKZoWBrRxSULJ5Iiq-ReNyFcwrZ-FqQsjg",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/23.png",
                    "level": 1085,
                    "losses": 336,
                    "lp": 2820,
                    "name": "Ablazeolive",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 2820,
                    "rankSoloLosses": 336,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 433,
                    "region": "NA1",
                    "tag": "NA1",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785790530253.0,
                    "wins": 433
                },
                "3": {
                    "PUUID": "2gljAn0ZFT-ryePXoOL3C3qXuNHIOvyXn1Uqpq4mQfedHfX0Bkpugo562FZAcQ4V7xxIUQ_pH7r5eg",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/508.png",
                    "level": 482,
                    "losses": 382,
                    "lp": 2809,
                    "name": "Davemon",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 2809,
                    "rankSoloLosses": 382,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 531,
                    "region": "NA1",
                    "tag": "NA1",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785733906000.0,
                    "wins": 531
                },
                "4": {
                    "PUUID": "RmLbx70TjosfKECrFjuugOc-YC86OAcaeSNELFSHeHbH0f9d-xH1ucg1wi7156QhKva5vRylwglgXA",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/1629.png",
                    "level": 309,
                    "losses": 187,
                    "lp": 2568,
                    "name": "Cole Caufield",
                    "rank": "I",
                    "rankFlexLP": 83,
                    "rankFlexLosses": 4,
                    "rankFlexRank": "II",
                    "rankFlexTier": "EMERALD",
                    "rankFlexTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Emerald.png",
                    "rankFlexWins": 5,
                    "rankSoloLP": 2568,
                    "rankSoloLosses": 187,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 307,
                    "region": "NA1",
                    "tag": "MTL",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785740109000.0,
                    "wins": 307
                },
                "5": {
                    "PUUID": "OJT0WA_maRtYcdS-Y0ti6ruoqqrB_VUBv0yFHHZYNB-Mz2evOOA1QGy8XwGj7EkL-PPZsY9nD2nlKg",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/3523.png",
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
                    "updatedAT": 1785797178383.0,
                    "wins": 350
                },
                "6": {
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
                "7": {
                    "PUUID": "19sfE3qajniXH-hxd3jocWVnx_mQ8MQi0eHxSqkBGjRJult6KBLjskittWVlqtbadqd0O3Tc8iHKuw",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/590.png",
                    "level": 745,
                    "losses": 126,
                    "lp": 2534,
                    "name": "DARKWINGS",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 2534,
                    "rankSoloLosses": 126,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 206,
                    "region": "NA1",
                    "tag": "NA3",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785795205721.0,
                    "wins": 206
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
                    "losses": 263,
                    "lp": 2430,
                    "name": "always",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 2430,
                    "rankSoloLosses": 263,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 416,
                    "region": "NA1",
                    "tag": "91225",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785735200000.0,
                    "wins": 416
                }
            },
            "tier": "CHALLENGER"
        }
    },
    'end=70&queue=solo&region=na1&start=60': {
        data: {
            "maxPages": 31,
            "profiles": {
                "61": {
                    "PUUID": "vL-kj_4S9j4fs1LoB2wBhKzD3CjS6GMag4_1zOBp52FY7RTM2LVPfYEqQmsGlYDlxaLnruywMnewhQ",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/7191.png",
                    "level": 803,
                    "losses": 403,
                    "lp": 1862,
                    "name": "Spawn",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 1862,
                    "rankSoloLosses": 403,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 491,
                    "region": "NA1",
                    "tag": "NA3",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785869808197.0,
                    "wins": 491
                },
                "62": {
                    "PUUID": "KFAgvuyxTHZNAOPvRf_2jh1u5VB3CXBSuR3i2L33imaYWfsJfd29WEHcgFshHjQuw-L8zGDW6BnD3w",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/3838.png",
                    "level": 1276,
                    "losses": 299,
                    "lp": 1861,
                    "name": "Lionheart Cermia",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 1861,
                    "rankSoloLosses": 299,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 336,
                    "region": "NA1",
                    "tag": "epic7",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785811969000.0,
                    "wins": 336
                },
                "63": {
                    "PUUID": "lpOxFv65-zvmDvqpuWWsdW1GaH5yLcWlzqNLtEEuUxbBC5NClwELjD00lp-uZvpY_Szl3-8ARsa4_w",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/6251.png",
                    "level": 900,
                    "losses": 301,
                    "lp": 1860,
                    "name": "Evan",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 1860,
                    "rankSoloLosses": 301,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 362,
                    "region": "NA1",
                    "tag": "lai",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785879890862.0,
                    "wins": 362
                },
                "64": {
                    "PUUID": "nN4L_8Rez1Hz7Llkz2eaDbV1XM_Yp5LCdc9untCRS-ZuM4Mparp0tPqIIkUBbT4wOLbAy5Ee3c3s9Q",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/6.png",
                    "level": 83,
                    "losses": 197,
                    "lp": 1857,
                    "name": "Sign",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 1857,
                    "rankSoloLosses": 197,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 342,
                    "region": "NA1",
                    "tag": "213",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785820787000.0,
                    "wins": 342
                },
                "65": {
                    "PUUID": "Ccp4jOAPjVRv7Xr8QhnyejoF5hwdw7tyND9s0HCw29l7tuWyzOQ4jmx-ToJYJ_RS9JiR1CY6Hlf0hg",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/1626.png",
                    "level": 89,
                    "losses": 54,
                    "lp": 1856,
                    "name": "Haboper",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 1856,
                    "rankSoloLosses": 54,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 113,
                    "region": "NA1",
                    "tag": "Red",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785382258000.0,
                    "wins": 113
                },
                "66": {
                    "PUUID": "GYiDwBYvXcvcngd0nc2qhDJzu3VFKlqhjXdpwATeQkEKXsr_Mxs5dx2mL5ad3oMY2gBnhojxi-PBQA",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/3494.png",
                    "level": 144,
                    "losses": 114,
                    "lp": 1848,
                    "name": "Aomine Daiki",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 1848,
                    "rankSoloLosses": 114,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 211,
                    "region": "NA1",
                    "tag": "NA10",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785619905000.0,
                    "wins": 211
                },
                "67": {
                    "PUUID": "ULic2xdFXE9rVu5m8Dn2_Q8vIn5RbqHNX21izjD1WWKaMaiNm2BTc51HZWStY2a-44b8N_v0tBfkpA",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/7084.png",
                    "level": 845,
                    "losses": 56,
                    "lp": 1846,
                    "name": "Revenge",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 1846,
                    "rankSoloLosses": 56,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 131,
                    "region": "NA1",
                    "tag": "yins",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785804765000.0,
                    "wins": 131
                },
                "68": {
                    "PUUID": "ByT03G8-aK_GWC4d9TJUy4t8K1vO_JrVqY3xnTFwZC7zcv6e4JcIHiIpoQS5Q-2PQF83fHbzLsNolQ",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/3795.png",
                    "level": 221,
                    "losses": 301,
                    "lp": 1830,
                    "name": "fame and glory",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 1830,
                    "rankSoloLosses": 301,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 389,
                    "region": "NA1",
                    "tag": "known",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785352173000.0,
                    "wins": 389
                },
                "69": {
                    "PUUID": "NwXD3BUYVmNQcaLHTxniYmdHaxQwoBmWZTaOMfUAy_oz5-QzSQToRozhWNaRIQ2itV6x7J4bnTHwqg",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/7187.png",
                    "level": 763,
                    "losses": 328,
                    "lp": 1828,
                    "name": "T0mio",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 1828,
                    "rankSoloLosses": 328,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 484,
                    "region": "NA1",
                    "tag": "NA1",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785817028000.0,
                    "wins": 484
                },
                "70": {
                    "PUUID": "9GSsXj8a8ZPZ7jYuSGo0V_AOxd-lirV92O5lnuqh0ysYIwY3habxYv9KbHYzb9KmZHVEBOzZPMUdXw",
                    "icon": "https://ddragon.leagueoflegends.com/cdn/16.15.1/img/profileicon/1160.png",
                    "level": 447,
                    "losses": 224,
                    "lp": 1828,
                    "name": "was",
                    "rank": "I",
                    "rankFlexLP": null,
                    "rankFlexLosses": null,
                    "rankFlexRank": null,
                    "rankFlexTier": "UNRANKED",
                    "rankFlexTierImg": null,
                    "rankFlexWins": null,
                    "rankSoloLP": 1828,
                    "rankSoloLosses": 224,
                    "rankSoloRank": "I",
                    "rankSoloTier": "CHALLENGER",
                    "rankSoloTierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "rankSoloWins": 288,
                    "region": "NA1",
                    "tag": "10000",
                    "tier": "CHALLENGER",
                    "tierImg": "http://127.0.0.1:5000/static/images/RankedEmblems/Challenger.png",
                    "updatedAT": 1785799339000.0,
                    "wins": 288
                }
            },
            "tier": "CHALLENGER"
        }
    }
}

function buildParams(params: Record<string, unknown>) {
    return Object.entries(params).sort(([keyOne], [keyTwo]) => {
        return keyOne.localeCompare(keyTwo)
    }).map(([key, value]) => {
        return `${key}=${value}`
    }).join('&')

}

describe('Leaderboards page', () => {
    beforeEach(() => {
        vi.spyOn(axios, 'get').mockImplementation(async (url, config) => {
            if (config?.params) {
                const queryParams = buildParams(config.params as Record<string, unknown>)
                if (queryParams in leaderBoardsResponse) {
                    return Promise.resolve(leaderBoardsResponse[queryParams])
                }
                else {
                    const error = new AxiosError(
                        'Request Failed',
                        AxiosError.ERR_BAD_REQUEST,
                        {} as any,
                        {},
                        {
                            data: {message: 'No data found'},
                            status: 400,
                            statusText: 'Bad Request',
                            headers: {},
                            config: {} as any,
                        }
                    );
                    throw error
                }
            } else {
                if (url === 'http://127.0.0.1:5000/api/leaderboards') {
                    return Promise.resolve('end=1&queue=solo&region=na1&start=0')
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
        const buttonNumber = '7'
        for (const i of pageButtons) {
            expect(i.textContent).toBe(String(start))
            if (i.textContent === buttonNumber) {
                expect(i).toHaveStyle({ textDecoration: 'underline #3776fc' })
            }
            else expect(i).not.toHaveStyle({ textDecoration: 'underline #3776fc' })
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

})