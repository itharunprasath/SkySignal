const apiKey = "9d16475b9ecfd5eac7b533216f7fefcb";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector("#search-icon");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
        if(data.weather[0].main =="Clouds"){
            weatherIcon.src ="images/clouds.png";
        }else if(data.weather[0].main =="Clear"){
            weatherIcon.src ="images/clear.png";
        }else if(data.weather[0].main =="Rain"){
            weatherIcon.src ="images/rain.png";
        }else if(data.weather[0].main =="Drizzle"){
            weatherIcon.src ="images/drizzle.png";
        }else if(data.weather[0].main =="Mist"){
            weatherIcon.src ="images/mist.png";
        }

        document.querySelector(".weather").style .display="block" ;



    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert('Error fetching weather data.  Please enter correct name.');
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});
