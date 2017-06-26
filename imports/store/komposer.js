/**
 * Created by jim on 2017/6/22.
 */
import React from 'react';
import { compose, setDefaults } from 'react-komposer';
import { Tracker } from 'meteor/tracker'
import store from './index';

export const getTrackerLoader = (reactiveMapper) => {
    return (props, onData, env) => {
        let trackerCleanup = null;
        const handler = Tracker.nonreactive(() => {
            return Tracker.autorun(() => {
                // assign the custom clean-up function.
                trackerCleanup = reactiveMapper(props, onData, env);
            });
        });

        return () => {
            if(typeof trackerCleanup === 'function') trackerCleanup();
            return handler.stop();
        };
    };
};

const options = {
    loadingHandler: () => (<p>Loading...</p>),
    errorHandler: (err) => (
        <p style={{color: 'red'}}>
            {err.message}
        </p>
    ),
    //propsToWatch: ['_id'],
    shouldSubscribe(currentProps, nextProps){
        return true;
        // return true if you need to re-run the data loader again.
    },
    shouldUpdate(currentProps, nextProps){
        return true;
        // return true if you need to re-run the data loader again.
    },
    env: {
        store
    }
};

export const myCompose = setDefaults(options);
