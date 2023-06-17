import '../CSS/fishingForecast.css'
import { LoadScript } from '@react-google-maps/api';
import fishHook from '../Images/fish-hook.svg'
import Map from '../Components/Map';
import Dropdown from '../Components/Dropdown';
import SearchBar from '../Components/SearchBar';
import FishingConditionsCard from '../Components/FishingConditionsCard';
import React, { useEffect, useState } from 'react';

export default function FishingForecast(){
    // calculate day of week for display
    const currentDate = new Date();
    const day = currentDate.getDay()
    const nextDay = (day + 1) % 7
    const weekdayValues = {
      "Sunday": 0,
      "Monday": 1,
      "Tuesday": 2,
      "Wednesday": 3,
      "Thursday": 4,
      "Friday": 5,
      "Saturday": 6,
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday"
    }
    const libraries = ["places"]
    const [selectedDay, setSelectedDay] = useState(weekdayValues[nextDay])
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [locationName, setLocationName] = useState('Current Location')
    const [currentWeather, setcurrentWeather] = useState(null)
    const [weatherForecast, setWeatherForecast] = useState(null)
    // getting current position or setting default
    useEffect(() => {
      // Check if the Geolocation API is supported by the browser
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setLatitude(position.coords.latitude); //setting to user location
            setLongitude(position.coords.longitude);
          },
          error => {
            console.error('Error getting location:', error);
            setLatitude("38.88966756009076"); //Default coordinates if error occurs
            setLongitude("-77.03545010027779");
            setLocationName('Washington, D.C')
          }
        );
      } else {
        setLatitude("38.88966756009076"); //Default coordinates if error occurs
        setLongitude("-77.03545010027779");
        setLocationName('Washington, D.C')
        console.error('Geolocation is not supported by this browser.');
      }
    }, []);
    // fetching weather data from backend
    useEffect(() => {
        async function getWeather(){
            try{
            // get current weather
            const currentWeatherResponse = await fetch(`https://fishingweather-w103.onrender.com/currentweather?lat=${latitude}&lon=${longitude}`)
            const currentWeather = await currentWeatherResponse.json()
            setcurrentWeather(currentWeather)
            // get 5 day forecast
            const foreCastResponse = await fetch(`https://fishingweather-w103.onrender.com/fiveDayWeather?lat=${latitude}&lon=${longitude}`)
            const forecast = await foreCastResponse.json()
            setWeatherForecast(forecast)
            console.log("Fetched weather")
            } catch (error) {
                console.error(error)
            }
        }
        if (latitude && longitude) {
            getWeather()
        }
        console.log(latitude, longitude)
        // Fetch weather data every time lat and long are updated
    },[latitude, longitude])

    // This function calculates what the next five days are and returns them in an array of strings
    // This is because the API utilized only returns weather day for the next 5 days, we want to avoid showing days we dont have data for
    function getNext5Days() {
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const today = new Date().getDay(); // Get the current day index (0-6)
      const next5Days = [];
    
      for (let i = 1; i <= 5; i++) {
        const nextDayIndex = (today + i) % 7; // Calculate the index of the next day
        next5Days.push(weekdays[nextDayIndex]); // Add the next day to the list
      }
    
      return next5Days;
    }
    // wrap in a LoadScript to enable use of google components
    return (
      <div className='background-image'>
          <LoadScript 
              googleMapsApiKey= {process.env.REACT_APP_GOOGLE_API_KEY}
              libraries={libraries}
            >
        <div className='forecast-main'>
              {latitude && longitude && (
                  <SearchBar setLat={setLatitude} setLon={setLongitude} setLocationName={setLocationName}/>
              )}
              <div className='weather-map-container'>
                <div className='current-weather'>
                  {
                    currentWeather ? (
                        <FishingConditionsCard weatherData={currentWeather} location={locationName}/>
                    ) : <div>Server is inactive while site is not in use, please wait a minute and it will boot up</div>
                  }
                </div>
                  <div className='map-box'>
                    {<Map userLat={latitude} userLon={longitude}/>}
                  </div>
            </div>
            <div className='center'>
              <div className='future-weather-container'>
              <div className='forecast-header'>
                  <div className='day-selection'>
                    <div className='day-selection-info'> Select Day  
                        <div class="tooltip">
                        <img className='tooltip-img' src={fishHook} alt='tooltop icon'/>
                        <span class="tooltiptext">The API only allows for the next 5 days of forecast information</span>
                      </div>
                    </div>
                    <div className='dropdown'>
                      <Dropdown defaultText={"Choose day of week"} options={ getNext5Days()
                        /*["Sunday","Monday","Tuesday", "Wednesday","Thursday","Friday","Saturday"]*/} 
                        selectedOption={selectedDay} setSelectedOption={setSelectedDay}/>
                    </div>
                  </div>
                  <div className='forecast-title'>
                    <div className='title'>Fishin Forecast:</div>
                  </div>
                </div>
                <div className='box'>
                {
                  weatherForecast && (
                    weatherForecast.list.map(data => {
                    // Return data only for the day of week selected
                    const d = new Date(data.dt_txt)
                    if (d.getDay() === weekdayValues[selectedDay]){
                    return <FishingConditionsCard weatherData={data} location={locationName} time={data.dt_txt}/>
                    }
                    return null
                  })
                )}
                </div>
              </div>
            </div>
        </div>
        </LoadScript>
      </div>
    )
}