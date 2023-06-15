function calculateFishingQuality(pressure, weatherCondition, temperature) {
    // Normalize the pressure between 0 and 1
    const normalizedPressure = (pressure - 900) / (1100 - 900);
    
    // Define an object to assign weights to weather conditions
    const weatherWeights = {
      'thunder': 0.1,
      'drizzle': 1,
      'rain': 0.9,
      'snow': 0.0,
      'mist': 0.5,
      'smoke': 0.1,
      'haze': 0.2,
      'dust': 0.1,
      'fog': 0.5,
      'sand': 0.1,
      'ash': 0.1,
      'squall': 0.1,
      'tornado': 0.1,
      'clear': 0.3,
      'clouds': 0.6
    };
    
    // Assign a weight based on the weather condition
    const weatherWeight = weatherWeights[weatherCondition.toLowerCase()] || 0;
    
    // Normalize the temperature between 0 and 1
    const normalizedTemperature = (temperature - 273) / 100;

    
    // Calculate the fishing quality
    let fishingQuality = (0.1 * normalizedPressure) + (0.6 * weatherWeight) + (0.3 * normalizedTemperature);
    return Math.tanh(fishingQuality).toFixed(2);
  }

function categorizeQuality(fishingQuality) {
    let category;
  
    switch (true) {
      case fishingQuality > 0.5:
        category = "Fantastic";
        break;
      case fishingQuality >= 0.4 && fishingQuality <= 0.49:
        category = "Great";
        break;
      case fishingQuality >= 0.3 && fishingQuality <= 0.39:
        category = "Fine";
        break;
      case fishingQuality >= 0.2 && fishingQuality <= 0.29:
        category = "Poor";
        break;
      default:
        category = "Bad";
        break;
    }
  
    return category;
  }

  module.exports = {
    calculateFishingQuality,
    categorizeQuality
  }