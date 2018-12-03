let AWS = require('aws-sdk');


let keyPairId = YOUR_KEY_PAIR_ID;
let privateKey = YOUR_PRIVATE_KEY;

let cfUrl = "xyz.cloudfront.net";
let expiry = 1543607263;

let policy = {
  'Statement': [{
    'Resource': 'http*://' + cfUrl + '/*',
    'Condition': {
      'DateLessThan': {'AWS:EpochTime': expiry}
    }
  }]
};

let policyString = JSON.stringify(policy);

let signer = new AWS.CloudFront.Signer(keyPairId, privateKey);

exports.getSignedCookie = function(req, res) {
    var options = {url: "http://"+cfUrl, policy: policyString};

    signer.getSignedCookie(options, function(err, cookie) {
        if (err) {
            res.send(err);
        } else {

            console.log("cookies: ");
            console.log(cookie);
            res.send(cookie);
            
        }
    });
};
