import React from 'react';
import classes from './Conditions.module.css'
let moment = require('moment');

const conditions = (props) => {
    console.log(props)
    let newDate = new Date();
    const weekday = props.dt * 1000
    newDate.setTime(weekday)
    

    // const imgURL = `owf owf-${props.weather[0].id} owf-5x`
    
    return (
        <div className={classes.Wrapper}>

            {props.error && <small className={classes.Small}>Please enter valid coordinates.</small>}

            {props.loading && <div className={classes.Loader} />}

            {props.responseObj.map(obj => (
                <div className="col-sm-2">
                    <div className="card">
                        <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
                        <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>                        
                        <h2>{Math.round(obj.main.temp)} °F</h2>
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