const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant('user')
    .readAny('brand')
    .readAny('customer')
    .readAny('order')
    .readAny('service')
    .readOwn('user')
    .updateOwn('user')

  ac.grant('admin')
    .extend('user')
    .readAny('user')
    .createAny('brand')
    .createAny('customer')
    .createAny('order')
    .createAny('service')
    .createAny('user')
    .updateAny('brand')
    .updateAny('customer')
    .updateAny('order')
    .updateAny('service')
    .updateAny('user')
    .deleteAny('brand')
    .deleteAny('customer')
    .deleteAny('order')
    .deleteAny('service')
    .deleteAny('user')

  return ac;
})();
