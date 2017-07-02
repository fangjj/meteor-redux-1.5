import React from 'react';
import i18n from 'meteor/universe:i18n';
import './Loading.less';

const Text = (label) => i18n.__(label);

const Loading  = () => {
    return (
        <img src="/logo-todos.svg" className="loading-app" alt={Text('components.loading.loading')} />
    );
};

export default Loading;
