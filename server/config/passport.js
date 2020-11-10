const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../models');
require('dotenv').config();

module.exports = passport => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = process.env.JWT_TOKEN;
  passport.use(
    new Strategy(options, (jwt_payload, done) => {
      User.findOne({
        where: { id: jwt_payload.id },
        attributes: { exclude: ['password'] }
      })
      .then(user => {
        if (user) return done(null, user);
        return done(null, false);
      });
    })
  );
};
