//Accounts Controller
/*
The accounts controller contains the logic which processes API method received by the route
*/

//Load the specific controller plugins
const ApiError = require('../error/ApiError');
const uuidv4 = require('uuid').v4;
const promiseHandler = require('../error/promiseHandler');
const axios = require('axios').default;

// Accepts a new account and saves it to the database
exports.postControl = async function (req, res, next) {

    try {

        var emailUrl = "https://api.notification.canada/v2/notifications/email";
        var emailBody = req.body.emailBody || req.query.emailBody;
        var emailHeader = req.body.emailBody || req.query.emailBody;

        var startTime = new Date();
        var results = await axios.post({
            method: "post",
            url: emailUrl,
            headers: emailHeader,
            data: emailBody
        })
        var endTime = new Date();
        var timeDiff = endTime - startTime;
        if (timeDiff < 60) {
            await sleep(60 - timeDiff)
        }
        if (results) res.status(200).send({ message: "Message Sent!", payload: results })

    }
    catch (error) {
        res.status(500).send({ message: "Error sending email", payload: results })

    }
};

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
