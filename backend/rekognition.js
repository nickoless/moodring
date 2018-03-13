// /**TODO:
//  * 1. two cups, toast up w/ the gang
//  * 2. from food stamps to a whole 'nother domain
//  * 
//  * - GRAB PICTURE FROM CAMERA COMPONENT
//  * - ADJUST METADATA FOR THE PURPOSE OF NAMING CONVENTION
//  * - UPLOAD TO S3
//  * - ANALYZE WITH S3
//  * - PASS ON TO SPOTIFY API
// */

// Load the SDK and UUID
require('dotenv').config()
const AWS = require('aws-sdk');
// const uuid = require('node-uuid');


// // .env contains AWS keys, update region (us-west-1 by default)

AWS.config.update({ 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-west-2'
});

// Create an S3 client

const s3 = new AWS.S3();

// AWS Rekognition, my dudes

const rekognition = new AWS.Rekognition()

// Placeholder params to 'query' a specific image based on name
// Would be a good idea to have a naming convention to save images

const faceParams = {
  Image: {
     S3Object: {
     Bucket: process.env.AWS_BUCKET, 
     Name: 'THESADGIRL.jpg'
    }
   },
  };

  const params = {
    Image: {
       S3Object: {
       Bucket: process.env.AWS_BUCKET, 
       Name: 'THESADGIRL.jpg'
      }
     },
    };
    faceParams.Attributes = ["ALL"];

// Detect some faces, my dudes 

let faces = new Promise((resolve, reject) => {
  rekognition.detectFaces(faceParams, function(err, data) {
    if (err) 
      reject(err);
    else     
      resolve(data);
  });
});


let labels = new Promise((resolve, reject) => {
  rekognition.detectLabels(params, function(err, data) {
    if (err) 
      reject(err);
    else     
      resolve(data);
  });
});

Promise.all([faces, labels]).then(value => {
  let faces = value[0]
  let labels = value[1]
  console.log('---------------- SO EMOTIONAL -------------------')
  console.log(faces.FaceDetails[0].Emotions)
  console.log('--------------- DON\'T LABEL ME ------------------')
  console.log(labels.Labels)
    
  // resolve()
});

// let test = []


// labels();
// faces();


// // dummy data emulating the actual output
// let emotionalArray = [ { Type: 'SAD', Confidence: 22.012407302856445 },
//   { Type: 'CONFUSED', Confidence: 6.585508346557617 },
//   { Type: 'CALM', Confidence: 5.396681785583496 } ]


// // changes key value pairing to { EMOTION: ## }
// let newEmotionalArray = emotionalArray.map((emotion) => {
//   if (emotion.SAD > 15) {
//     emotion.SAD = 99
//   }
//   let key = emotion.Type
//   let value = emotion.Confidence
//   let obj = {}
//   obj = {[key]: value}
//   return obj
// });

// console.log(newEmotionalArray)
