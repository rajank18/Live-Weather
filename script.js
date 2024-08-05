const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');
const searchInput = document.querySelector('.search-box input');

// Function to fetch and display weather data
const fetchWeather = () => {
  const key = 'c6b4e3e21d9044a2a29151153230707';
  const city = searchInput.value;

  if (city === "") return;

  fetch(
    `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log("API Response:", json);

      if (json.error) {
        cityHide.textContent = city;
        container.style.height = '400px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        console.log('Error! No data found!!');
        return;
      }

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const desc = document.querySelector('.weather-box .desc');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      if (!image || !temperature || !desc || !humidity || !wind) {
        console.error("Some elements are missing in the HTML structure");
        return;
      }

      const weather = json.current.condition.text;
      const weather_icon = json.current.condition.icon;
      console.log("Weather Condition:", weather);
      console.log("Weather Icon:", json.current.condition.icon);

      if (cityHide.textContent == city) {
        return;
      } else {
        cityHide.textContent = city;

        container.style.height = '555px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        setTimeout(() => {
          container.classList.remove('active');
        }, 2500);

        switch (weather) {
          case 'Clear':
          case 'Sunny':
            image.src = 'images/clear.png';
            break;
          case 'Light rain':
          case 'Light rain shower':
          case 'Light drizzle':
          case 'Patchy rain nearby':
            image.src = 'images/rain.png';
            break;
          case 'Snow':
            image.src = 'images/snow.png';
            break;
          case 'Storm':
          case 'Heavy rain':
             image.src = 'images/storm.png';
          
          case 'Mist':
            image.src = 'images/mist.png';
            break;
          case 'Cloudy':
          case 'Partly Cloudy':
            image.src = 'images/cloudy.png'
          case 'Haze':
            image.src = 'images/mist.png';
            break;
          case 'Foggy':
            image.src = 'images/foggu.png';
          default:
            image.src = weather_icon;
        }

        temperature.innerHTML = `${json.current.temp_c}<span>°C</span>`;
        desc.innerHTML = `${json.current.condition.text}`;
        humidity.innerHTML = `${json.current.humidity}%`;
        wind.innerHTML = `${json.current.wind_kph} km/h`;

      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
};


search.addEventListener("click", fetchWeather);


searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault(); 
    fetchWeather();
  }
});
