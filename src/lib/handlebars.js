const timeago = require('timeago.js');

const helpers = {};

helpers.timeago = (savedTimestamp) => {
    return timeago.format(savedTimestamp);
};

module.exports = helpers;