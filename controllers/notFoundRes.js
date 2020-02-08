const { sendOnlyMessage } = require('../libs/helpers');
const { resMessage } = require('../libs/resMessage');

module.exports.notFoundRes = (req, res) => {
  sendOnlyMessage(res, resMessage.notFoundRes);
};
