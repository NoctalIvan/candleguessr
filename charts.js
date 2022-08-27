const axios = require('axios')

const Cryptr = require('cryptr')
const cryptr = new Cryptr('TrAu3q+wKx8@68(W')

const tickers = require('./tickers.json').filter(t => t.symbol.slice(-4) == 'USDT')

const getChart = async (symbol, startTime, limit = 30) => {
    const {data} = await axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=${limit}&startTime=${startTime}`)
    if(data.length < 30) {
        return null
    }

    return data
        .map(a => a.slice(1, 5).map(b => +(+b / +data[0][1]).toPrecision(4)))
}

const getRandomSymbol = () => {
    const t = tickers[Math.floor(Math.random() * tickers.length)]
    return t.symbol
}

const hourLen = 60 * 60 * 1000
const getRandomTime = () => {
    const shift = Math.floor(Math.random() * 1000) + 24
    return +new Date() - shift * hourLen
}

const getRandomChart = async () => {
    const symbol = getRandomSymbol()
    const time = getRandomTime()
    const code = cryptr.encrypt(JSON.stringify({symbol, time}))
    const chart = await getChart(symbol, time)
    return {
        code,
        chart
    }
}

const recoverChart = async (code) => {
    const { symbol, time } = JSON.parse(cryptr.decrypt(code))
    const chart = await getChart(symbol, time, 30 + 24)

    return { symbol, time, chart }
}

module.exports = {
    getRandomChart,
    recoverChart,
}