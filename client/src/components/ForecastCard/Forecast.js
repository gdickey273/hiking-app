import React, { useState } from 'react';
import Conditions from '../WeatherConditions/Conditions';
import classes from './Forecast.module.css';

const Forecast = () => {

    let [longitude, setLongitude] = useState('');
    let [latitude, setLatitude] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState({})
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);

    function getForecast(e) {
        e.preventDefault();
     
        // Clear state in preparation for new data
        setError(false);
        setResponseObj({});
       
        setLoading(true);
       
        
     
     fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?units=${unit}&lat=${latitude}&lon=${longitude}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": process.env.REACT_APP_API_KEY
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.cod !== 200) {
                throw new Error()
            }
     
            setResponseObj(response);
            setLoading(false);
        })
        .catch(err => {
            setError(true);
            setLoading(false);
            console.log(err.message);
        });
     }
    

   return (
    <div>
        <h2>Find Current Weather Conditions</h2>
        <p>Raleigh Lat: 35.787743 Long: -78.644257</p>
            
        <form onSubmit={getForecast}>
                <input
                    type="text"
                    placeholder="Enter Longitude"
                    maxLength="50"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className={classes.textInput}
                    />
                <input
                    type="text"
                    placeholder="Enter Latitude"
                    maxLength="50"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className={classes.textInput}
                    />
                <label>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        className={classes.Radio}
                        />
                    Fahrenheit
                </label>
                <label>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        className={classes.Radio}
                        />
                    Celcius
                </label>
                <button type="submit" className={classes.Button} >Get Forecast</button>
            </form>

            <Conditions
              responseObj={responseObj}
              error={error} //new
              loading={loading} //new
              />
    </div>
   )
}

export default Forecast;