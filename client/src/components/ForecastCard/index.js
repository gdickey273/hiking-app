import React, { useState, useEffect } from 'react';
import Conditions from '../WeatherConditions/Conditions';
import classes from './Forecast.module.css';
import API from "../../utils/API";
import extAPI from "../../utils/extAPI";

const Forecast = (props) => {

    let [longitude, setLongitude] = useState('');
    let [latitude, setLatitude] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState([])
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    const [APIKey, setAPIKey] = useState('');

    const id = props.trailId;

    useEffect(() => {
        API.getTrail(id)
            .then(res => { // console.log(res.data)
                setLongitude(res.data.originLng)
                setLatitude(res.data.originLat)
            })
            .catch(err => console.log(err));

        extAPI.getAPIKeys()
            .then(res => 
                {setAPIKey(res.data.weather)}
            )
            .catch(err => console.log(err));
    }, [id]);

    function getForecast(e) {
        e.preventDefault();

        // Clear state in preparation for new data
        setError(false);
        setResponseObj(null);
        setLoading(true);

        fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?units=${unit}&lat=${latitude}&lon=${longitude}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": APIKey
            }
        })
            .then(response => response.json())
            .then(data => {
                const dailyData = data.list.filter(reading => reading.dt_txt.includes("15:00:00"))
                setResponseObj(dailyData);
                setLoading(false);
            })

            .catch(err => {
                setError(true);
                setLoading(false);
                console.log(err.message);
            });
    }


    return (
        <div className="forecast-button">
            <form onSubmit={getForecast}>
                {/* <input
                    type="text"
                    placeholder="Enter Latitude"
                    maxLength="50"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className={classes.textInput}
                    />
                <input
                    type="text"
                    placeholder="Enter Longitude"
                    maxLength="50"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className={classes.textInput}
                    />                 */}
                {/* <label>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        className={classes.Radio}
                        />
                    Fahrenheit
                </label> */}
                {/* <label>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        className={classes.Radio}
                        />
                    Celcius
                </label> */}
                <button type="submit" className={classes.Button} >Get Forecast</button>
            </form>

            {responseObj && <Conditions
                responseObj={responseObj}
                error={error} //new
                loading={loading} //new
            />}
        </div>
    )
}

export default Forecast;