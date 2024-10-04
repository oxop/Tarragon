const apiKey = '2fd52a5e9df26a5ae7301199199566de'; // 请替换为您的新 API 密钥
const city = 'Massa,IT';

async function getWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`;
        console.log('Requesting weather data from:', url);

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received weather data:', data);

        const description = data.weather[0].description;
        const temp = Math.round(data.main.temp);
        const humidity = data.main.humidity;
        const windSpeed = Math.round(data.wind.speed * 3.6); // 转换为 km/h

        const weatherDescriptionElement = document.getElementById('weatherDescription');
        const weatherDetailsElement = document.getElementById('weatherDetails');

        if (weatherDescriptionElement && weatherDetailsElement) {
            weatherDescriptionElement.textContent = `Previsioni meteo per le prossime 24 ore: ${description}`;
            weatherDetailsElement.textContent = `Vento: ${windSpeed}km/h; Temp: ${temp}°C; Umidità: ${humidity}%`;
        } else {
            console.error('Weather elements not found in the DOM');
        }
    } catch (error) {
        console.error('Errore nel recupero dei dati meteo:', error);
        const weatherDescriptionElement = document.getElementById('weatherDescription');
        const weatherDetailsElement = document.getElementById('weatherDetails');
        if (weatherDescriptionElement && weatherDetailsElement) {
            weatherDescriptionElement.textContent = 'Impossibile caricare le informazioni meteo';
            weatherDetailsElement.textContent = '';
        }
    }
}

// 确保在 DOM 加载完成后执行脚本
document.addEventListener('DOMContentLoaded', () => {
    getWeather();
    // 每小时更新一次天气信息
    setInterval(getWeather, 3600000);
});