/**
 * Created by jim on 2017/6/23.
 */
import {USER_ME_SUBSCRIPTION} from './constant';
import {STOP_SUBSCRIPTION} from 'meteor-redux-middlewares';

const USER_ME_SUBSCRIPTION_READY = 'USER_ME_SUBSCRIPTION_READY';
const USER_ME_SUBSCRIPTION_CHANGED = 'USER_ME_SUBSCRIPTION_CHANGED';
const USER_REACTIVE_SOURCE_CHANGED = 'USER_REACTIVE_SOURCE_CHANGED';
const USER_LOGOUT = 'USER_LOGOUT';
const USER_LOGIN = 'USER_LOGIN';
const USER_REGISTER = 'USER_REGISTER';
const OPEN_SET = 'OPEN_SET';
const ERROR_SET = 'ERROR_SET';


export {
    USER_REACTIVE_SOURCE_CHANGED,
    USER_ME_SUBSCRIPTION_READY,
    USER_ME_SUBSCRIPTION_CHANGED,
    USER_ME_SUBSCRIPTION,
    STOP_SUBSCRIPTION,
    USER_LOGOUT,
    USER_LOGIN,
    USER_REGISTER,
    OPEN_SET,
    ERROR_SET,
};