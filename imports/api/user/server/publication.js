/**
 * Created by jim on 2017/6/22.
 */
import { Meteor } from 'meteor/meteor';
import { User } from '../user';
import {USER_ME_SUBSCRIPTION} from '../../constant';

Meteor.publish(USER_ME_SUBSCRIPTION, () => {
    const _id = this.userId;
    return User.findOne({_id});
});