/**
 * Created by jim on 2017/6/22.
 */
import { Meteor } from 'meteor/meteor';
import { Lists } from '../list.js';

import {
    LIST_PUBLIC_SUBSCRIPTION,
    LIST_PRIVATE_SUBSCRIPTION,
} from '../../constant';

Meteor.publish(LIST_PUBLIC_SUBSCRIPTION, function listsPublic() {
    return Lists.find({
        userId: { $exists: false },
    }, {
        fields: Lists.publicFields,
    });
});

Meteor.publish(LIST_PRIVATE_SUBSCRIPTION, function listsPrivate() {
    if (!this.userId) {
        return this.ready();
    }

    return Lists.find({
        userId: this.userId,
    }, {
        fields: Lists.publicFields,
    });
});