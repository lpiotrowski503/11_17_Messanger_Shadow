//----------IMPORTS---------------------//


const   jsonWebTokenStrategy    =   require('passport-jwt').Strategy,
        jsonWebTokenExtract     =   require('passport-jwt').ExtractJwt,

        userModel               =   require('../models/userModel'),
        configDb                =   require('../config/configDb')


//----------EXPORTS---------------------//


module.exports  =   (passport) => {
    let opts = {}
    opts.jwtFromRequest =   jsonWebTokenExtract.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey    =   configDb.secret
    passport.use(new jsonWebTokenStrategy(opts, (jwt_payload, done) => {
        userModel.getUserById(jwt_payload.data._id, (err, user) => {
            if (err)    return done(err, false)
            if (user)   return done(null, user)
            else return done(null, false)
        })
    }))   
}