import { Router, Request, Response } from 'express';

const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post ('/', async (req: Request, res: Response) => {
  try {

    const cityName = req.body.cityName;
    WeatherService.getWeatherForCity(cityName)
  
    .then((data) => {
      HistoryService.addCity(cityName);
      res.json(data);
    });
  } catch (err) {
    res.status(500).json(err);
  };

});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  HistoryService.getCities()
  .then((data) => {
    return res.json(data);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ error: 'City ID is required' });
      return;
    }
    await HistoryService.removeCity(req.params.id);
    res.json({ success: 'Removed city from search history' });
  } catch (err) {
    res.status(500).json(err);
  };
});

export default router;

