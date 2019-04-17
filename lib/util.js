const util = {};
util.Error = err => {
  if (typeof err === 'string') {
    return { errorMsg: err };
  } else {
    let errStr = err.toString();
    return { errorMsg: errStr };
  }
};
module.exports = util;
