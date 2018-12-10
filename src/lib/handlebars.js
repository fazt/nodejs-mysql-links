const timeago = require('timeago.js');
const timeagoInstance = timeago();

const helpers = {};

helpers.timeago = (savedTimestamp) => {
    return timeagoInstance.format(savedTimestamp);
};

module.exports = helpers;