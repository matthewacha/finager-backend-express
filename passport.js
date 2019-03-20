/*jshint esversion: 6 */
/* jshint node: true */

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const userModel = require('./database/models/user');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const {
    verifyGoogleToken
} = require('./utils/token.utils');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        userModel.findOrCreate({
            googleId: profile.id
        }, function(err, user) {
            return done(err, user);
        });
    }
));

passport.use(new GoogleTokenStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    function(accessToken, refreshToken, profile, done) {
        //first verify the integrity of the token coming from Google accordingly. Util function for this?
        let user_id = verifyGoogleToken(accessToken);
        console.log('The user ID from frontend is: ' + user_id);
        //using a method in the db schema
        //check for the user with the profile ID
        //if that user is not found, create a new user,
        //after creating that new user, save their profile
        //Otherwise, return an error
    }));