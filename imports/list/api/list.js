/**
 * Created by jim on 2017/6/22.
 */
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import i18n from 'meteor/universe:i18n';
//import { Todos } from '../todos/todos.js';

class ListsCollection extends Mongo.Collection {
    insert(list, callback, locale = 'en') {
        const ourList = list;
        if (!ourList.name) {
            const defaultName = i18n.__(
                'api.lists.insert.list',
                null,
                { _locale: locale }
            );
            let nextLetter = 'A';
            ourList.name = `${defaultName} ${nextLetter}`;

            while (this.findOne({ name: ourList.name })) {
                // not going to be too smart here, can go past Z
                nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
                ourList.name = `${defaultName} ${nextLetter}`;
            }
        }

        return super.insert(ourList, callback);
    }
    remove(selector, callback) {
        //Todos.remove({ listId: selector });
        return super.remove(selector, callback);
    }
}

export const Lists = new ListsCollection('list');

Lists.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

Lists.schema = new SimpleSchema({
    name: { type: String },
    incompleteCount: { type: Number, defaultValue: 0 },
    userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
});

Lists.attachSchema(Lists.schema);

Lists.publicFields = {
    name: 1,
    incompleteCount: 1,
    userId: 1,
};

Lists.helpers({
    // A list is considered to be private if it has a userId set
    isPrivate() {
        return !!this.userId;
    },
    isLastPublicList() {
        const publicListCount = Lists.find({ userId: { $exists: false } }).count();
        return !this.isPrivate() && publicListCount === 1;
    },
    editableBy(userId) {
        if (!this.userId) {
            return true;
        }

        return this.userId === userId;
    },
    todos() {
        //return Todos.find({ listId: this._id }, { sort: { createdAt: -1 } });
    },
});