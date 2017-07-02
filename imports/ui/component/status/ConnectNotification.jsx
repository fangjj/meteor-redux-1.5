/**
 * Created by jim on 2017/6/24.
 */
import React from 'react';
import i18n from 'meteor/universe:i18n';
const Text = (text) => i18n.__(text);
import './ConnectNotification.less';

const ConnectionNotification = () => (
    <div className="notifications">
        <div className="notification">
            <span className="icon-sync" />
            <div className="meta">
                <div className="title-notification">
                    {Text('components.connectionNotification.tryingToConnect')}
                </div>
                <div className="description">
                    {Text('components.connectionNotification.connectionIssue')}
                </div>
            </div>
        </div>
    </div>
);

export default ConnectionNotification;