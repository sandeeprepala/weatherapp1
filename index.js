const cityInput = document.querySelector('.cityName');
const apiKey = "92cf7c12df53affc01faa462c02277f9";
const tapsubmit = document.querySelector('.submit');
tapsubmit.addEventListener('click',async event=>{
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            document.querySelector('.result').innerHTML = "Enter a Valid City Name";
        }
    }
    else{
        document.querySelector('.result').innerHTML = "Enter a Valid City Name";
    }
});
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!(response).ok)
    {
        throw new Error("Could not fetch weather data");

    }
    else
    {
        return response.json();
    }
} 
function displayWeatherInfo(data)
    {
        const {name: city, 
            main: {temp, humidity}, 
            weather: [{description, id}]} = data;
        document.querySelector('.cityDis').innerHTML = city;
        document.querySelector('.tempDis').innerHTML = (temp-273.15 ).toFixed(2)+' ° C';
        document.querySelector('.humidityDis').innerHTML = 'Humidity - '+humidity;
        document.querySelector('.descriptionDis').innerHTML = description; 
        document.querySelector('.emojiDis').innerHTML = getWeatherEmoji(id);
        
    }
    function getWeatherEmoji(weatherId){

        switch(true){
            case (weatherId >= 200 && weatherId < 300):
                return "⛈";
            case (weatherId >= 300 && weatherId < 400):
                return "🌧";
            case (weatherId >= 500 && weatherId < 600):
                return "🌧";
            case (weatherId >= 600 && weatherId < 700):
                return "❄";
            case (weatherId >= 700 && weatherId < 800):
                return "🌫";
            case (weatherId === 800):
                return "☀";
            case (weatherId >= 801 && weatherId < 810):
                return "☁";
            default:
                return "❓";
        }
    }
    function refresh()
    {
        location.reload();
    }