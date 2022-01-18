var AWS = require("aws-sdk");
const fs = require("fs");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY_ID,
});

// const params = {
//   Bucket: "yeetmeoffacliff",
//   //   CreateBucketConfiguration: {
//   //     // Set your region here
//   //     LocationConstraint: "us-east-1",
//   //   },
// };

// s3.createBucket(params, function (err, data) {
//   if (err) console.log(err, err.stack);
//   else console.log("Bucket Created Successfully", data.Location);
// });

console.log(process.env.AWS_ACCESS_KEY_ID);
const uploadFile = (fileName) => {
  const fileContent = fs.readFileSync(fileName);
  const params = {
    Bucket: "yeetmeoffacliff",
    Key: "Yeet.jpg",
    Body: fileContent,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded Succesffully ${data.Location}`);
  });
};

const fetchFile = () => {
  var s3Params = {
    Bucket: "yeetmeoffacliff",
    Key: "Yeet.jpg",
  };
  s3.getObject(s3Params, function (err, res) {
    if (err === null) {
      console.log(res);
      res.attachment("file.ext"); // or whatever your logic needs
      // res.send(data.Body);
    } else {
      res.status(500).send(err);
    }
  });
};

// fetchFile();a

uploadFile("kup.png");
