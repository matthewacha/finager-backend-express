/*jshint esversion: 8 */
/* jshint node: true */
const {
    OAuth2Client
} = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createToken = function(auth) {
    return jwt.sign({
        id: auth.id
    }, 'my-secret', {
        expiresIn: 60 * 120
    });
};

module.exports = {
    verifyGoogleToken: function(token) {
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            // If request specified a G Suite domain:
            //const domain = payload['hd'];'

            return userid;
        }
        verify().catch(console.error);
    },
    generateToken: function(req, res, next) {
        req.token = createToken(req.auth);
        return next();
    },
    sendToken: function(req, res) {
        res.setHeader('x-auth-token', req.token);
        return res.status(200).send(JSON.stringify(req.user));
    }
};