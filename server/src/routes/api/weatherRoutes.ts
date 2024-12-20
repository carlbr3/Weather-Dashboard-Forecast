import { Router } from 'express';

const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // TODO: GET weather data from city name
  getWeatherForCity(req.body.city)
    .then((weather) => res.json(weather))
    .catch((error) => res.status(500).
    json({ message: 'An error occurred', error: error.message
  }));
  
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (_req, _res) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req, _res) => {});

export default router;
import axios from 'axios';

async function getWeatherForCity(city: string): Promise<any> {
  const apiKey = '7f3eabb6652bfdf380c9f853d13a4ca'; // Replace with your actual API key
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await axios.get(url);
  return response.data;
}

