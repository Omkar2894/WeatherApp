import apiClient from "../http-common";

export const getWeatherDetailsApi = async (locationValue, apikey) => {
  return await apiClient.get(
    `/weather?q=${locationValue}&units=metric&appid=${apikey}`
  );
};
