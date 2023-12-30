import axios from "axios";
export const baseUrl = "https://api.openweathermap.org/data/2.5";

export default axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

// http://api.openweathermap.org/data/2.5/forecast/daily?q=London&cnt=3&appid={API key}