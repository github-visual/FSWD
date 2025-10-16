document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "320e95af8d6ee31da4a3efb637e609a0";
  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    /*
    In API:
    - error can occur while fetching - so try,catch use
    - Fetching data can take time , then it makes code asycn - so use asycn,wait
    */
    try {
      const weatherd = await fetchWeatherData(city);
      displayWeatherData(weatherd);
    } catch (error) {
      showError();
    }
  });
  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    errorMessage.classList.add("hidden");
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City Not Found");
    }
    return await response.json();
  }
  function displayWeatherData(weatherData) {
    const { name, main, weather } = weatherData;

    // If weather info is already visible, fade out first
    if (weatherInfo.classList.contains("show")) {
      weatherInfo.classList.remove("show");
      weatherInfo.classList.add("fade-out");

      // After fade-down completes (1s = CSS transition time)
      setTimeout(() => {
        updateWeatherContent(name, main.temp, weather[0].description);
        // Fade up (new data)
        weatherInfo.classList.remove("fade-out");
        weatherInfo.classList.add("show");
      }, 1000);
    } else {
      // First time showing (no fade-out needed)
      updateWeatherContent(name, main.temp, weather[0].description);
      weatherInfo.classList.add("hidden");
      weatherInfo.classList.remove("show");

      // Delay showing (your original 2-second delay)
      setTimeout(() => {
        weatherInfo.classList.remove("hidden");
        void weatherInfo.offsetWidth;
        weatherInfo.classList.add("show");
        errorMessage.classList.add("hidden");
      }, 2000);
    }
  }
  function updateWeatherContent(city, temp, desc) {
    cityName.textContent = city;
    temperature.textContent = ` ${temp}°C`;
    description.textContent = ` ${desc}`;
  }
  function showError() {
    if (weatherInfo.classList.contains("show")) {
      weatherInfo.classList.remove("show");
      weatherInfo.classList.add("fade-out");

      setTimeout(() => {
        weatherInfo.classList.add("hidden");
        weatherInfo.classList.remove("fade-out");
      }, 1000);
      errorMessage.textContent = "❌ City not found. Please try again.";
      errorMessage.classList.remove("hidden");
    } else {
      errorMessage.textContent = "❌ City not found. Please try again.";
      errorMessage.classList.remove("hidden");
    }
  }
});
