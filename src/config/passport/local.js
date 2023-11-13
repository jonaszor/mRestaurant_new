const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const {Pracownik, PracownikSchema} = require('../../models/Pracownik');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const user = await Pracownik.findById(jwt_payload.id);

      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
  );
};