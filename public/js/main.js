const TOKEN = 'c9359a4304f9860ab45d0ae6cb104767';
const city = document.querySelector('.ville');
const temps = document.querySelector('.Temps')
const time = document.querySelector('.time');
const date = document.querySelector('.date')
const temperature = document.querySelector('.Temperature')
const icone = document.querySelector('.icone')
const previIcones = document.querySelectorAll('.previIcones')
const previTemperatures = document.querySelectorAll('.previTemperatures')
const previTemps = document.querySelectorAll('.previTemps')


function timeReload() {
    let event = new Date();
    time.innerText = event.toLocaleTimeString('en-US', {
        timeStyle: 'medium'
    });
    date.innerText = event.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    setTimeout(timeReload, 1000);
}

function APICall(long, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=en&appid=${TOKEN}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            city.innerHTML = data.timezone
            temps.innerHTML = data.current.weather[0].description
            temperature.innerHTML = Math.round(data.current.temp) + '°C';
            icone.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
            for(let i = 0; i < previTemps.length;i++){
                previTemperatures[i].innerHTML = Math.round(data.daily[i + 1].temp.day) + '°C'
                previTemps[i].innerHTML = data.daily[i + 1].weather[0].main
                previIcones[i].src = `http://openweathermap.org/img/wn/${data.daily[i + 1].weather[0].icon}@2x.png`
            }
            timeReload();
        })
}


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        APICall(long, lat)
    }, () => {
        alert("ya po de gps")
    })
}