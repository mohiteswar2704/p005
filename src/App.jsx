import React, { useState } from 'react';
import './App.css';
import { APIURL, callApi } from './lib';

const App = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const IMGURL = import.meta.env.BASE_URL;

  function getData()
  {
    setError("");
    setData(null);
    if(city === "")
    {
      setError("Enter name of the city");
      return;
    }
    setIsLoading(true);
    const URL = APIURL(city);
    callApi("GET", URL, "", loadData);
  }

  function loadData(res)
  {
    setData(res);
    setIsLoading(false);
  }

  return (
    <div className='app'>
      <header className='header'>
        <img src={IMGURL + "weather.png"} alt='' />
        <span>Weather App</span>
      </header>
      <main className='section'>
        <div className='inputdiv'>
          <input type='text' placeholder='Enter city name' value={city} onChange={(e)=>setCity(e.target.value)} />
          <button onClick={()=>getData()}>Search</button>
        </div>
        {error && <div className='errMsg'>{error}</div>}
        {data && 
          <div className='weatherinfo'>
            <div className='weatherinfo__primary'>
              <img src={"https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"} alt='Weather icon' />
              <div>
                <p className='weatherinfo__city'>{data.name}</p>
                <p className='weatherinfo__temp'>{data.main.temp}c</p>
              </div>
            </div>
            <div className='weatherinfo__details'>
              <p><span>Condition</span><span>{data.weather[0].description}</span></p>
              <p><span>Humidity</span><span>{data.main.humidity}</span></p>
              <p><span>Wind Speed</span><span>{data.wind.speed}</span></p>
            </div>
          </div>
        }
      </main>
      <footer className='footer'>Copyright @ 2026</footer>

      {isLoading && 
        <div className='progress'>
          <img src={IMGURL + "loading.gif"} alt='Loading indicator' />
        </div>
      }
    </div>
  );
}

export default App;