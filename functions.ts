
const rangeLoop = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}
let pageButtons: number[] = rangeLoop(1,10)


function update(currPage: number, maxPage: number){
    if (maxPage > 10) {
        
        if (currPage > pageButtons[9]){
            if ( (Math.floor(currPage/10) + 1) * 10 < maxPage) {
                pageButtons = rangeLoop( (Math.floor(currPage/10) * 10 )+ 1, (Math.floor(currPage/10) + 1) * 10)
            } else {
                pageButtons = rangeLoop( (Math.floor(currPage/10) * 10) + 1, maxPage)
            }
        }
    
        if (currPage < pageButtons[0]){
            if (currPage < 1) {
                pageButtons = rangeLoop(1, maxPage)
            } else {
                const temp = (Math.floor(currPage/10) - 1 ) * 10
                const start = temp === 0 ? 1 : temp
                pageButtons = rangeLoop( start,  Math.floor(currPage/10) * 10)
    
            }
        }
    } else {
        pageButtons = rangeLoop(1,maxPage)
    }





    console.log('------', currPage, ' ', maxPage, ' ------')
    console.log(pageButtons)


}

let maxPage = 31

// Test for when the page > pageButtons[9]

// update(5, maxPage)
// update(10, maxPage)
// update(11, maxPage)
// update(18, maxPage)
// update(22, maxPage)
// update(29, maxPage)
// update(30, maxPage)
// update(31,maxPage)
// update(55, maxPage)

// Test for when the page < pageButtons[0]

// update(5, maxPage)
// update(10, maxPage)
// update(11, maxPage)
// update(10, maxPage)
// update(25, maxPage)
// update(20,maxPage)

// maxPage = 5
// update(10,maxPage)
// update(3, maxPage)

function buildParams(params: Record<string, unknown>) {
    return Object.entries(params).sort(([keyOne], [keyTwo]) => {
        return keyOne.localeCompare(keyTwo)
    }).map( ([key, value]) => {
        return `${key}=${value}`
    }).join('&')
    
}


const leaderBoardsResponse = {
    'end=1&queue=solo&region=na1&start=0': {
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

}


const params = {
    region: 'na1',
    queue: 'solo',
    start: '0',
    end: '10'
}
let key = buildParams(params)
console.log(key)

let response = leaderBoardsResponse[key]
