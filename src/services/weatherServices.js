import apiClient from "../http-common";

export const getWeatherDetailsApi = async (locationValue) => {
  return await apiClient.get(
    `/weather?q=${locationValue}&units=metric&appid=267564316bb041c3679d55e5de9a1f0f`
  );
};


//API For 16 Days Weather
// api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid={API key}