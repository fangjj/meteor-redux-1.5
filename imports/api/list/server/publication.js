/**
 * Created by jim on 2017/6/22.
 */
import { Meteor } from 'meteor/meteor';
import { List } from '../list.js';

import {
    LIST_PUBLIC_SUBSCRIPTION,
    LIST_PRIVATE_SUBSCRIPTION,
} from '/imports/actions/list/constant';

Meteor.publish(LIST_PUBLIC_SUBSCRIPTION, function listsPublic() {
    return List.find({
        userId: { $exists: false },
    }, {
        fields: List.publicFields,
    });
});

Meteor.publish(LIST_PRIVATE_SUBSCRIPTION, function listsPrivate() {
    if (!this.userId) {

        setTimeout(()=>{return this.ready();},3000);
    }

    //return List.find({
    //    userId: this.userId,
    //}, {
    //    fields: List.publicFields,
    //});
});