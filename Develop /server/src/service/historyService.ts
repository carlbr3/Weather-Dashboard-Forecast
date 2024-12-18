// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
// TODO: Complete the HistoryService class
import { promises as fs } from "fs";
import path from "path";
const historyFilePath = path.join(__dirname, "../../data/searchHistory.json");
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  async read (): Promise<City[]> {
    try {
      const data = await fs.readFile(historyFilePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write (cities: City[]): Promise<void> {
    try {
      await fs.writeFile(historyFilePath, JSON.stringify(cities));
    } catch (error) {
      console.error(error);
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities (): Promise<City[]> {
    return await this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity (city: City): Promise<void> {
    const cities = await this.read();
    cities.push(city);
    await this.write (cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity (id: string): Promise<void> {
   let cities = await this.read();
    cities =cities.filter((city) => city.id !== id);
      await this.write(cities);
    }
  }
export default new HistoryService();
