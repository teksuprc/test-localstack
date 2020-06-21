'use-strict';

const AWS = require('aws-sdk');


const consumer = async (event, context) => {
    if(event.Records) {
        event.Records.forEach(record => {
            let rec = new Buffer(record.kinesis.data, 'base64').toString('ascii');
            console.log('record: ', rec);
        });
    }
};

const producer = async (event, context) => {
    //const client = new AWS.Kinesis({
    //    endpoint: 'http://localhost:4567',
    //    region: 'us-east-1'
    //});

    const stream = process.env.KINESIS_STREAM;
    const client = new AWS.Kinesis({
        endpoint: 'http://localhost:4567',
        region: 'us-east-1'
    });
    let loopIter = 0
  
    while(context.getRemainingTimeInMillis() > 4999900) {
        console.log(`remaining: ${context.getRemainingTimeInMillis()}`);
        loopIter++;

        const partKey = `loop_${loopIter}`;

        const payload = JSON.stringify({
            'event_x': Math.random() * 10,
            'event_y': Math.random() * 20
        });

        client.putRecord({
            StreamName: stream,
            PartitionKey: partKey,
            Data: payload
        }, (err, data) => {
            if(err) console.log('err', err.message || err);
            else console.log('data', data);
        });
    }
};

const tester = async (event, context) => {
    return {
        statusCode: 200,
        body: JSON.stringify({message: 'Tester Method: GET executed successfully!'}, null, 2)
    };
};


module.exports = {
    consumer,
    producer,
    tester
}
