import fetch from 'node-fetch'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 8000
const app = express()
// allow only origin url to access api
app.use(cors(
    ({
        origin: ["https://fishingweather.onrender.com"],
        methods:['GET'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
))
app.use(express.json())
// returns current weather data from the openWeather api
app.get('/currentweather', async (req,res) =>{
    try{
    const lat = req.query.lat
    const lon = req.query.lon
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.openWeather_API_KEY}`)
    const data = await response.json()
    res.status(200).send(data)
    } catch (error) {
        console.error(error)
        res.status(404).send({message:"not found"})
    }
})
// returns 5 day weather forecast data from the openWeather api
app.get('/fiveDayWeather', async (req,res) =>{
    try{
        const lat = req.query.lat
        const lon = req.query.lon
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.openWeather_API_KEY}`)
        const data = await response.json()
        res.status(200).send(data)
        } catch (error) {
            console.error(error)
            res.status(404).send({message:"not found"})
        }
})

app.get('/health', (req,res) =>{
    res.status(200).send('All good')
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
  });