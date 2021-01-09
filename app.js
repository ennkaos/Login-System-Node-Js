//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https=require("https");
const { post } = require("request");
const { Console } = require("console");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}))
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const data={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }

        }]

    }
    const jsonData=JSON.stringify(data);
    const apiID="363ce8fa37beebf7c7271932c0b37ea4-us7";
    const listID="883e4d3d5b";
    const url ="https://us7.api.mailchimp.com/3.0/lists/883e4d3d5b";
    const options={
        method:"POST",
        auth:"alexandru1:363ce8fa37beebf7c7271932c0b37ea4-us7",


    }
   const request= https.request(url,options,function(response){
    if (response.statusCode===200){
        res.sendFile(__dirname+"/succes.html");
        
    }else{
          res.sendFile(__dirname+"/failure.html");
    }
      response.on("data",function(data){
          console.log(JSON.parse(data));
         
          
      })
    })
    request.write(jsonData);
    request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/")
})
app.listen(process.env.PORT||3000, function () {
    console.log("Server is running on port 3000");
});


//api key
// 363ce8fa37beebf7c7271932c0b37ea4-us7
//unique id 883e4d3d5b