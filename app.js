
const mongoose = require("mongoose");
const userdb = require("./model/model");


var express = require("express");
var fs = require("fs");
const app = express();


// Connetion to the Database
mongoose.connect(
  "mongodb+srv://monika:E8NOBs964CGl6axV@cluster0.2elkdse.mongodb.net/?retryWrites=true&w=majority"
);
const path = require("path");

// Multer used for storing or uploading the images and acts as a middleware

const multer = require("multer");
var storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, "./uploads/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


var upload = multer({
  storage: storage,
});

const photo = path.join(__dirname, "./uploads/images");
app.use(express.static(photo));

const cors = require("cors");
const { response } = require("express");
const corsoptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};



app.use(cors(corsoptions));
app.use(express.json());

// Fetching the URL
app.get("/", async (req, res) => {
  res.send("welcome to my Instaclone");
});

// Fetching the Data from the Database
app.get("/post", async (req, res) => {
  console.log("Success");
  var user = await userdb.find();
  user.reverse();
  // res.json({ user });
  res.send(user);
});



// Posting the Data 
app.post("/posts", upload.single("PostImage"), function (req, res, next) {
  var obj = new userdb({
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    PostImage: req.file.originalname,
    date: req.body.date,
  });


  app.get("/image/:id", (req, res) => {
    const photo = path.join(__dirname, "./uploads/images", req.params.id);
    res.sendFile(photo);
  });

  obj
    .save()
    .then((response) => {
      response.json({
        message: "Post added successfull!",
      });
    })
    .catch((err) => ({
      message: "an error occured!",
    }));
});


// Listening on the Port no

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
