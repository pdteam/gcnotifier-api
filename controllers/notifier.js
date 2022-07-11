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
        var emailUrl = "https://api.notification.canada.ca/v2/notifications/email";
        var emailBody = req.body.emailBody || req.query.emailBody;
        var emailHeader = req.body.emailHeader || req.query.emailHeader;
        var distributionList = req.body.distributionList || req.query.distributionList;


        for (var a = 0; a < distributionList.length; a++) {
            var thisEmail = JSON.parse(JSON.stringify(emailBody)) //make a fresh copy of the email
            thisEmail.email_address = distributionList[a].email_address; //Bring the individual email from the distribution list in

            for (const [key, value] of Object.entries(distributionList[a])) {
                console.log(`${key}: ${value}`);
                if (key != 'email_address') thisEmail.personalisation[key] = value;
            }
            var startTime = new Date();
            var results = await axios({
                method: "post",
                url: emailUrl,
                headers: emailHeader,
                data: thisEmail
            })
            // var results = true
            // Add a delay of 60 milliseconds on the total job so the API calls don't exceed 1000 calls in 60 seconds as per GC Notify's requirements
            var endTime = new Date();
            var timeDiff = endTime - startTime;
            console.log(timeDiff)
            if (timeDiff < 60) {
                await sleep(60 - timeDiff)
            }
        }
        res.status(200).send({ message: "Message Sent!", payload: true })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error sending email", payload: results })

    }
};

function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}
