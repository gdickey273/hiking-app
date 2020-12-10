import React, { useState, useEffect } from 'react';
import Conditions from '../WeatherConditions/Conditions';
// import classes from './Forecast.module.css';
import API from "../../utils/API";
// import extAPI from "../../utils/extAPI";

const Forecast = (props) => {

    let [longitude, setLongitude] = useState(null);
    let [latitude, setLatitude] = useState(null);
    // let [unit, setUnit] = useState('imperial');
    let [responseObj, setResponseObj] = useState(null)
    // let [error, setError] = useState(false);
    // let [loading, setLoading] = useState(false);
    // const [APIKey, setAPIKey] = useState(null);

    const id = props.trailId;

    useEffect(() => {
        // extAPI.getAPIKeys()
        // .then(res => {
        //     setAPIKey(res.data.weather);
        API.getTrail(id)
            .then(res => { // console.log(res.data)
                setLongitude(res.data.originLng);
                setLatitude(res.data.originLat);
            })
            .catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
        getForecast();
    }, [latitude, longitude])

    function getForecast() {
        // e.preventDefault();

        // Clear state in preparation for new data
        // setError(false);
        setResponseObj(null);
        // setLoading(true);

        // console.log(APIKey)

        fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?units=imperial&lat=${latitude}&lon=${longitude}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "896f638738msh22dc63917c22c23p19d7ffjsn560d550ebd3c"
            }
        })
            .then(response => response.json())
            .then(data => {
                const dailyData = data.list.filter(reading => reading.dt_txt.includes("15:00:00"))
                setResponseObj(dailyData);
                // setLoading(false);
            })

            .catch(err => {
                // setError(true);
                // setLoading(false);
                console.log(err.message);
            });
    }

    return (
        <div className="forecast-button">
            {/* <form onSubmit={getForecast}>
                <button type="submit" className={classes.Button} >Get Forecast</button>
            </form> */}

            {responseObj &&
                <Conditions
                    responseObj={responseObj}
                // error={error} //new
                // loading={loading} //new
                />}
        </div>
    )
}

export default Forecast;