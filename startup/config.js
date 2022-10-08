const JWTSECRET = process.env.JWTSECRET;

module.exports = function () {
  if (!JWTSECRET) {
    throw new Error("FATAL ERROR: JWTSECRET is not defined.");
  }
};
