# aws-sdk-q

Hack for adding the .q() method to all aws-sdk request objects (aws-sdk is a peerDependency).

## How it works?

Take a look at [the source](/index.js) the short version its a terrible
hack into the AWS.Request object (which aws-sdk returns from just about
all api calls).

## Usage

```js
// AWS is identical to aws-sdk but it has .q method on all
// requests
var AWS = require('aws-sdk-q');
var ec2 = new AWS.EC2({ region: 'us-west-2' });

ec2.describeAccountAttributes({}).q()
  .then(function(data) {
    // the promise is resolved on the 'complete' event of request object
    console.log(JSON.stringify(req.data, null, 2));
  })
  .catch(function(error) {
    // rejected if the 'complete' event contains an error
    console.log(error);
  });

```

Credit: https://github.com/aws/aws-sdk-js/issues/13#issuecomment-11868232
