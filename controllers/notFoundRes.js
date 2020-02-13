const { sendOnlyMessage } = require('../libs/helpers');
const { resMessages } = require('../libs/resMessages');

module.exports.notFoundRes = (req, res) => {
  sendOnlyMessage(res, resMessages.notFoundRes);
};
