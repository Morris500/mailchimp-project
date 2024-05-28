
const express = require('express');
const request = require('request');
const bodyparser = require('body-parser');
const https = require('https');

const app = express();
const port = 4000;

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {

const firstname = req.body.Fname;
const lastname = req.body.Lname;
const email = req.body.Email;


const data = {
  members: [{
    email_address: email,
    status: "subscribed",
    merge_fields:{
    FNAME: firstname,
    LNAME: lastname,
    }
  }]
}

const jsonData = JSON.stringify(data);
console.log(jsonData);

const url = "........";
const options = {
    method: "POST",
    auth:"....."



}
 const request = https.request(url, options, function (response) {
  response.on("data", function (data) {
console.log(JSON.parse(data));
  })
  if (response.statusCode===200) {
    res.sendFile(__dirname + "/success-page.html")
  } else {
    res.sendFile(__dirname + "/failure-page.html")
  }
})

request.write(jsonData);
request.end();
});

app.post("/failure", function (req, res) {
res.redirect("/")
});

app.listen(port, function() { console.log("server is running on port 4000")
});

