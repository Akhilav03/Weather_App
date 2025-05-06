window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                console.log("User Location:", lat, lon);
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4750c203be313c78512f3ac4dee33ca8&units=metric`;
                checkWeather(url);
            },
            (error) => {
                alert("Could not get your location. Try searching manually.");
                console.error(error);
                const fallbackUrl = `https://api.openweathermap.org/data/2.5/weather?q=Bristol&appid=...&units=metric`;
                checkWeather(fallbackUrl);
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
        const fallbackUrl = `https://api.openweathermap.org/data/2.5/weather?q=Bristol&appid=...&units=metric`;
        checkWeather(fallbackUrl);
    }
});


const button = document.getElementById('search-button');
button.addEventListener('click', function(){
    const input = document.getElementById('city').value.trim();
    if (typeof input === 'string' && /^[a-zA-Z\s]+$/.test(input)) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=4750c203be313c78512f3ac4dee33ca8&units=metric`;
        checkWeather(url);
      } else{
        alert('Enter a valid city name!')
      }
})


async function checkWeather(url){
    try{
        const response = await fetch(url);
        let data = await response.json();
        console.log(data);
        document.querySelector('.weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.querySelector('.description').innerText = data.weather[0].description;
        document.querySelector('.temp').innerText = `${data.main.temp}°C`;
        document.querySelector('.city').innerText = data.name;
        document.getElementById('hum').innerText = `${data.main.humidity}%`;
        document.getElementById('speed').innerText = `${data.wind.speed} km/hr`;

    }catch(error){
        alert(error.message);
    }

}