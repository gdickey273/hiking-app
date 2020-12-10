import React from 'react';
import classes from './Conditions.module.css'
// import '../WeatherConditions/owfont-regular.min.css'
let moment = require('moment');

const conditions = (props) => {
    return (
        <div className={classes.Wrapper} className="weather-conditions">

            {/* {props.error && <small className={classes.Small}>Please enter valid coordinates.</small>}

            {props.loading && <div className={classes.Loader} />} */}

            {props.responseObj.map((obj, i) => (
                <div key={i} className="col-sm-2">
                    <div className="card forecast-day">
                    <img src={`http://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`}></img>  
                        <p className="card-title">{moment((obj.dt * 1000)).format('dddd')} {moment(obj.dt * 1000).format('MM/D/YY')}</p>
                        {/* <p className="text-muted"></p>                   */}
                        <p>{Math.round(((obj.main.temp)))}°F</p>
                            <div className="card-body">
                                <p className="card-text">{obj.weather[0].description}</p>
                            </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default conditions;