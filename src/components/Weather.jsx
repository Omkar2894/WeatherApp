import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { getWeatherDetailsApi } from "../services/weatherServices";

const Weather = () => {
  const [locationValue, setLocationValue] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);


  const handleLocation = (e) => {
    setLocationValue(e.target.value);
  };

  const apikey=process.env.REACT_APP_API_KEY;
 
  const getWeatherDetails = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      getWeatherDetailsApi(locationValue,apikey )
        .then((response) => {
          console.log("Weather Details", response.data);
          let dateTime = new Date(response.data.dt * 1000 + (response.data.timezone * 1000));
          console.log("dateTime", dateTime);
          setWeatherInfo(response.data);
        })
        .catch((err) => {
          console.log("API Failed");
          setWeatherInfo(null)
        });
      setLocationValue("");
    }
  };

  
  return (
    <div>
      <div className="flex justify-center items-center h-screen m-auto w-screen bg-gradient-to-r from-blue-300 to-purple-500 overflow-hidden">
        <div className="w-5/12 px-8 flex justify-center items-center">
          <div className="border border-gray-500 bg-white bg-opacity-30 rounded-lg shadow-lg backdrop-blur-xl backdrop-filter py-10 w-full">
            <div className="flex justify-center w-full">
              <input
                className="bg-white border-gray-100 rounded-xl text-lg px-2 focus:outline-none"
                value={locationValue}
                type="text"
                placeholder="Enter Location"
                onChange={handleLocation}
                onKeyDown={getWeatherDetails}
              />
              
              <button className={`mx-2 px-2 bg-white  text-black rounded ${locationValue !==""? 'hover:cursor-pointer':'hover:cursor-not-allowed'}`}  disabled={!locationValue} onClick={getWeatherDetails}><FiSearch /></button>
              
            </div>

            {weatherInfo !== null ? (
              <div className="mx-4 my-4">
                <div className="h-full w-full">
                  {/* //Weather Info//    */}
                  <div className="flex justify-center text-white">
                    {/* //City Name// */}
                    <IoLocationOutline className="my-auto" />
                    <p className="text-2xl mx-2">{weatherInfo?.name}</p>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    {/* //Weather Img// */}
                    <div className="h-20 w-20">
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@2x.png`}
                        alt=""
                      />
                    </div>
                    {/* //Temp Description// */}
                    <p className="text-white text-sm text-center">
                      {weatherInfo?.weather[0].main}
                    </p>
                    {/* //temp// */}
                    <p className="my-4 text-5xl text-center text-white">
                      {weatherInfo?.main?.temp}
                      <span className="text-lg mx-2">&deg;C</span>
                    </p>
                    {/* //Feels Link// */}
                    <p className="my-1 text-white text-center text-sm">
                      Feels Like {weatherInfo?.main?.feels_like}&deg;C
                    </p>
                  </div>
                </div>

                <div className="flex justify-evenly w-full text-white my-4">
                  {/* //Humidity// */}
                  <div className="flex">
                    <WiHumidity className="text-4xl" />
                    <div className="flex flex-col mx-2">
                      <p className="text-xl">
                        {weatherInfo?.main?.humidity}{" "}
                        <span className="text-xs">%</span>
                      </p>
                      <p className="text-sm">Humidity</p>
                    </div>
                  </div>
                  {/* //Wind// */}
                  <div className="flex">
                    <FaWind className="text-xl" />
                    <div className="flex flex-col mx-2">
                      <p className="text-xl">
                        {weatherInfo?.wind?.deg}{" "}
                        <span className="text-xs">m/sec</span>
                      </p>
                      <p className="text-sm">Wind</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mx-8">
                <p className="text-sm text-center text-white my-20">
                  Please Enter Valid City Name to See Weather Conditions
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
