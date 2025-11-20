// 3rd party library express that implements our http server
const express = require('express')
const server = express.Router();

// Define route handler for the POST '/resetPassword' path
server.post('/resetPassword', async (req, res) => {

    // get helper function for password resets
    const {resetPassword} = require('../helpers/auth')

    // attempt to reset the password without any additional verification
    const reset = await resetPassword(req.body.username, req.body.newPassword)

    if (reset.status) {
        // log the user in automatically after the reset
        res.cookie('webAppCookie', `${req.body.username}`);
        res.redirect('/pages/dashboard.html');
    } else {
        // bubble up the server-side message directly to the client
        res.redirect(`/pages/resetPassword.html?error=${reset.message}`);
    }
})

module.exports = server
