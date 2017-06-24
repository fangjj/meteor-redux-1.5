/**
 * Created by jim on 2017/6/24.
 */
import React from 'react';

export default ({isLoading, timedOut, pastDelay, error}) => {
    if(isLoading) {
        if(timedOut){
            return <div>Load timed out</div>
        }else if(pastDelay){
            return <div>Loading...</div>
        }else {
            return null;
        }
    } else if(error) {
        return <div>Error! Component failed to load</div>
    } else {
        return null;
    }
};
