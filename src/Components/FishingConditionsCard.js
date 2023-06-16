import React from 'react';
import '../CSS/fishingConditionsCard.css'
import { categorizeQuality, calculateFishingQuality } from '../JS/calculateFishingQuality';

const FishingConditionsCard = ({ weatherData, location, time}) => {
  if (!weatherData) {
    return null; // Return null if the weather data is not available
  }

  const { weather, main, wind, visibility} = weatherData;

  // Extract relevant data from the weather object
  const { main: weatherMain, description, icon } = weather[0];
  const { temp, humidity, pressure} = main;

  const quality = calculateFishingQuality(pressure, weather[0].main, temp)

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Months are zero-based, so adding 1
    const day = date.getDate();
    const hours = date.getHours();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    const formattedDate = `${month}-${day}, ${hours % 12 || 12}${amOrPm}`;
  
    return formattedDate;
  }
  return (
    <div className='current-weather-card' style={{}}>
        {time ? <div className='date-time'>{formatDate(time)}</div>: null}
        <div className='details'>
            <div className='temp'>{((temp - 273.15) * (9/5) + 32).toFixed(0)}<span>&deg;</span></div>
            <div className='details-right'>
            <div className='condition'>{description.toUpperCase()}</div>
            <div className='location'>{location}</div>
            </div>
        </div>
        <div className='icon-container'>
          <img className='weather-icon' src={`${icon}.svg`} alt={'Weather Icon'}></img>
        </div>
        <div className='grade-container'>
            <div className='grade-title'>Fishing Grade:</div>
            <div className='grade'>{categorizeQuality(quality)}</div>
          </div>
        <div className='info'>
          <div className='wind-speed'>Wind speed: {(wind.speed*3.6*0.62).toFixed(0)} mi/h</div>
          {/*<div className='pressure'>pressure (hpa): {pressure}</div>*/}
          <div className='humidity'>humidity: {humidity}%</div>
          {<div className='visibility'>visibility: {((visibility/1000) * 0.621371).toFixed(0)}km</div>}
        </div>
    </div>
  );
};

export default FishingConditionsCard;