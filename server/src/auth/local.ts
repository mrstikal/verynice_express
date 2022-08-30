import passport from 'passport'
import { Strategy } from 'passport-local'
import User from '../model/userModel'
import bcrypt from 'bcryptjs'

const fields: any = {
    usernameField: 'nameOrEmail',
    passwordField: 'password',
    failureFlash: true
}

const verifyCallback = async (name: any, password: any, done: any) => {

    const user = await User.findOne({ $or: [{ email: name }, { name: name }] })

    if (!user) {
        return done(null, false, {
            message: 'Uživatel nebyl nalezen'
        })
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
        return done(null, false, {
            message: 'Chybné heslo'
        })
    }

    return done(null, user)
}

passport.use(new Strategy(fields, verifyCallback))

passport.serializeUser((user: any, done) => {
    done(null, user);
})

passport.deserializeUser((user: any, done) => {
    done(null, user)
})

const auth = (req: any, res: any, next: any) => {

    passport.authenticate('local', (err, user, info) => {

        if (err) { return next(err) }

        if (!user) { return res.status(404).send(info.message) }

        res.status(202).send('Přihlášení proběhlo úspěšně')

    })(req, res, next)

}


export default auth