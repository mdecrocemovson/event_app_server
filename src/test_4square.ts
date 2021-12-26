const sdk = require("api")("@fsq-docs/v1.0#2zd3m9lkwz5bjkc");

var axios = require("axios");

const url = require("url");
// import { URLSearchParams } from "url";

const test = axios.create({
  baseURL: "https://api.foursquare.com",
  headers: {
    Accept: "application/json",
    Authorization: "fsq3yt86lf43wvVD86bXdK3bO6S+3ZDtZbTvov0MEuSUksg=",
  },
});

const params = new url.URLSearchParams("ll=40.71512,-73.9508");

const response = test
  .get("/v3/places/nearby", { params })
  .then((response) => {
    console.log(response.data, "response");
  })
  .catch((err) => {
    console.log(err, "error");
  });

// sdk["places-nearby"]()
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));
