const express = require('express')
const app = express()

const {getRandomChart, recoverChart } = require('./charts')

const cors = require('cors')
app.use(cors())
const port = process.env.PORT || 3334

app.use('/', express.static('front'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/chart/new', async (req, res) => {
    try {
        let data = null
        while(!data || !data.chart) {
            data = await getRandomChart()
        }
        res.send(data)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

app.get('/chart/check', async (req, res) => {
    try {
        const data = await recoverChart(req.query.code)
        res.send(data)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})