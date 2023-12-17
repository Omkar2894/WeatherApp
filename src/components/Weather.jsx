import React, { useState } from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { CiTempHigh } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import axios from "axios"

const Weather = () => {
    const [locationValue, setLocationValue] = useState("")
    const [weatherInfo, setWeatherInfo] = useState(null)

    const handleLocation = (e) => {
        setLocationValue(e.target.value)
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${locationValue}&units=metric&appid=267564316bb041c3679d55e5de9a1f0f`;
    const getWeatherDetails = (e) => {
        if (e.key === "Enter") {
            axios.get(url).then((response) => {
                console.log("Weather Details", response.data);
                setWeatherInfo(response.data)

            }).catch((err) => {
                console.log("API Failed");
            })
            setLocationValue("")
        }


    }

    return (
        <div>
            <div className="flex justify-center items-center h-screen m-auto w-4/12">
                <div className="border border-gray-500 rounded-md bg-indigo-500 py-10 w-full">
                    <div className="flex justify-center w-full">
                        <input className='bg-white border-gray-100 rounded-xl text-lg px-2 focus:outline-none' value={locationValue} type='text' placeholder='Enter Location' onChange={handleLocation} onKeyDown={getWeatherDetails} />
                    </div>

                    {weatherInfo !== null ?
                        <div className='mx-4 my-4'>
                            {/* //Weather Info//    */}
                            <div className="flex justify-center text-white">
                                {/* //City Name// */}
                                <IoLocationOutline className='my-auto' />
                                <p className='text-2xl mx-2'>{weatherInfo?.name}</p>
                            </div>

                            <div className="flex flex-col justify-center items-center">
                                {/* //Weather Img// */}
                                <div className='h-20 w-20'>
                                    <img src={`https://openweathermap.org/img/wn/${weatherInfo?.weather[0].icon}@2x.png`} alt="" />
                                </div>
                                {/* //Temp Description// */}
                                <p className='text-white text-sm text-center'>{weatherInfo?.weather[0].main}</p>
                                {/* //temp// */}
                                <p className='my-4 text-5xl text-center text-white'>{weatherInfo?.main?.temp}<span className='text-lg mx-2'>&deg;C</span></p>
                                {/* //Feels Link// */}
                                <p className='my-1 text-white text-center text-sm'>Feels Like {weatherInfo?.main?.feels_like}&deg;C</p>
                            </div>

                            <div className="flex justify-evenly w-full text-white my-4">
                                {/* //Humidity// */}
                                <div className="flex">
                                    <WiHumidity className='text-4xl' />
                                    <div className="flex flex-col mx-2">

                                        <p className='text-xl'>{weatherInfo?.main?.humidity} <span className='text-xs'>%</span></p>
                                        <p className='text-sm'>Humidity</p>
                                    </div>
                                </div>
                                {/* //Wind// */}
                                <div className="flex">
                                    <FaWind className='text-xl' />
                                    <div className="flex flex-col mx-2">
                                        <p className='text-xl'>{weatherInfo?.wind?.deg} <span className='text-xs'>m/sec</span></p>
                                        <p className='text-sm'>Wind</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div className='mx-8'>
                        <p className='text-sm text-center text-white my-20'>Please Enter City Name to See Weather Conditions</p>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Weather