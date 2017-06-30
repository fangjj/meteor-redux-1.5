/**
 * Created by jim on 2017/6/24.
 */
import React from 'react';

export default ({isLoading, timedOut, pastDelay, error}) => {
    if(isLoading) {
        if(timedOut){
            return <div className="red">Add Load timed out</div>
        }else if(pastDelay){
            return <div className="red">Add Loading...</div>
        }else {
            return null;
        }
    } else if(error) {
        return <div className="red">Add Error! Component failed to load</div>
    } else {
        return null;
    }
};