import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import User from '../model/userModel'
import jwtConfig from '../config/jwtConfig'


const jwtOptions: any = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = jwtConfig.jwtSecret
jwtOptions.expiresIn = jwtConfig.jwtExpiration

const auth = (req: any, res: any, next: any) => {

    passport.use(new Strategy(jwtOptions, (jwt_payload, done) => {

        User.findOne({$or: [{email: jwt_payload.nameOrEmail}, {name: jwt_payload.nameOrEmail}] }, (err: any, user: any) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
    

    passport.authenticate('jwt', { session: false }, function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.status(401).send("Přístup odmítnut").end(); }
        next();
    })(req, res, next);

}


export default auth