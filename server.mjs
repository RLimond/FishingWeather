import fetch from 'node-fetch'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 8000
const app = express()
app.use(cors())
app.use(express.json())

app.get('/currentweather', async (req,res) =>{
    try{
    console.log('current weather request')
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

app.get('/fiveDayWeather', async (req,res) =>{
    console.log('5day weather request')
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