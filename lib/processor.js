'use strict';
const AWS = require('aws-sdk');
const csv = require('csvtojson');

const _s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  endpoint: 'https://s3.amazonaws.com'
});

exports.handler = async (event) => {

  for (let index = 0; index < event.Records.length; index++) {
    const element = event.Records[index];
    const bucket = element.s3.bucket.name;
    const key = element.s3.object.key;
    const stream = _s3.getObject({
      Bucket: bucket,
      Key: key
    }).createReadStream();
    const json = await csv().fromStream(stream);
    console.info(JSON.stringify(json, null, 2));
  }

  return;
};
