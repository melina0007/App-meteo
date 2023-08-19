const apiKey = "42a2992a8a2138a1deff98854cdca705";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
  
      const temperature = Math.round(data.main.temp);
  
      const description = data.weather[0].description;
  
      const icon = data.weather[0].icon;
  
      const details = [
        `Ressentis: ${Math.round(data.main.feels_like)}°C`,
        `Humidité: ${data.main.humidity}%`,
        `Vitesse du vent: ${data.wind.speed} m/s`,
      ];

      weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
      weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
      weatherDataEl.querySelector(".description").textContent = description;
      weatherDataEl.querySelector(".details").innerHTML = details.map((detail)=> `<div>${detail}</div>`).join("");

    } catch (error) {
      weatherDataEl.querySelector(".icon").innerHTML = "";
      weatherDataEl.querySelector(".temperature").textContent = "";
      weatherDataEl.querySelector(".description").textContent = "Une erreur est apparue, réessayez plus tard s'il vous plaît";
      weatherDataEl.querySelector(".details").innerHTML = "";

    }
}