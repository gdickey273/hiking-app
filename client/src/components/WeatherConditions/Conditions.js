import React from 'react';
import classes from './Conditions.module.css'
// import '../WeatherConditions/owfont-regular.min.css'
let moment = require('moment');

const conditions = (props) => {
    
    return (
        <div className={classes.Wrapper}>

            {props.error && <small className={classes.Small}>Please enter valid coordinates.</small>}

            {props.loading && <div className={classes.Loader} />}

            {props.responseObj.map((obj, i) => (
                <div key={i} className="col-sm-2">
                    <div className="card">
                        <p className="card-title">{moment((obj.dt * 1000)).format('dddd')}</p>
                        <p className="text-muted">{moment(obj.dt * 1000).format('MMMM Do, h:mm a')}</p>                        
                        <p>Feels like: {Math.round(((obj.main.temp)))} °F</p>
                            <div className="card-body">
                                <p className="card-text">{obj.weather[0].description}</p>
                                <p className={`owf owf-${obj.weather[0].id} owf-5x`}>{obj.weather[0].id}</p>
                            </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default conditions;