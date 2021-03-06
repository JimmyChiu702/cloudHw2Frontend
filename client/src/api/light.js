var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

export function getLightState() {
    let context = {
        newLightState: null,
        getLightState: true
    };
    let sendParams = {
        DelaySeconds: 10,
        MessageAttributes: {},
        MessageBody: JSON.stringify(context),
        QueueUrl: "https://sqs.us-east-1.amazonaws.com/915824420250/trytrylook"
    };
    return new Promise((resolve, reject) => {
        sqs.sendMessage(sendParams, (err, data) => {
            if (err)
                reject(err);
            let receiveParams = {
                AttributeNames: [
                    "SentTimestamp"
                ],
                MaxNumberOfMessages: 10,
                MessageAttributeNames: [
                    "All"
                ],
                QueueUrl: "https://sqs.us-east-1.amazonaws.com/915824420250/trytrylook2",
                VisibilityTimeout: 20,
                WaitTimeSeconds: 10
            };
            sqs.receiveMessage(receiveParams, (err, data) => {
                if (err)
                    reject(err);
                resolve(data.Message[0]['Body']);
            });
        });
    });
}

export function switchLight(newLightState) {
    let context = {
        newLightState: newLightState,
        getLightState: false
    };
    let sendParams = {
        DelaySeconds: 10,
        MessageAttributes: {},
        MessageBody: JSON.stringify(context),
        QueueUrl: "https://sqs.us-east-1.amazonaws.com/915824420250/trytrylook"
    };
    return new Promise((resolve, reject) => {
        if (err)
            reject(err);
        let receiveParams = {
            AttributeNames: [
                "SentTimestamp"
            ],
            MaxNumberOfMessages: 10,
            MessageAttributeNames: [
                "All"
            ],
            QueueUrl: "https://sqs.us-east-1.amazonaws.com/915824420250/trytrylook2",
            VisibilityTimeout: 20,
            WaitTimeSeconds: 10
        };
        sqs.receiveMessage(receiveParams, (err, data) => {
            if (err)
                reject(err);
            resolve(data.Message[0]['Body']);
        });
    });
}