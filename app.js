const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

require('dotenv').config()

app.use(express.json())
app.use(cors({origin: 'http://127.0.0.1:5500'}))
app.use(express.urlencoded({extended: true}))

const GEOCODING_API = process.env.GEOKEY

app.get('/', (req,res) => {
  res.send('Weather Server is Live.')
})

// THIS RETURNS 'lat' and 'lng'. Request body should contain {"address": "city, state"}
app.post('/', (req, res) => {
  console.log(req.body)
  let address = req.body.address.split(', ')
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address[0]}+${address[1]}&key=${process.env.GEOKEY}`)
    .then(response => response.json())
    .then(data => {
      let coords = data.results[0].geometry.location
      res.send(coords)
    })
})

app.listen(port, () => {
  console.log(`Weather app listening on port ${port}`)
})