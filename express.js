const express = require("express");
const app = express();
const fs = require("fs");
const Firebase = require("./classes/Firebase.js")
const cookieParser = require('cookie-parser')
const adminInstance = Firebase.getAdminInstance();







app.enable("trust proxy") // ::1 = localhost
app.set("etag", false) // cache disabled
app.use(express.static(__dirname + "/website"))
app.use(express.json())
app.use(cookieParser());

let files = fs.readdirSync("./website/documents").filter(f => f.endsWith(".js"))

files.forEach(async f => {
    const file = require(`./website/documents/${f}`)
    if(file && file.name) {
        app.get(file.name, file.run) 
        console.log("Loaded " + file.name)
    }
})

let apiFiles = fs.readdirSync("./website/api").filter(f => f.endsWith(".js"))

apiFiles.forEach(async f => {
    const file = require(`./website/api/${f}`)
    if(file && file.name) {
        if(file.multer) {
            app.post(file.name, file.multer, file.run) 
        } else {
            app.post(file.name, file.run)
        }
        console.log("Loaded " + file.name)
    }
})

let fb = Firebase.construct({
    apiKey: "AIzaSyBUpES8-DA22Pl7kuE1448s8osMM_HbV7w",
    authDomain: "swimming-399fc.firebaseapp.com",
    projectId: "swimming-399fc",
    storageBucket: "swimming-399fc.appspot.com",
    messagingSenderId: "868892607675",
    appId: "1:868892607675:web:fdb740bd67be8a59e0d59e",
  })
  if(fb) console.log("[Database] - Loaded")

  
const port = process.env.PORT || 3000
app.listen(port, async() => {
    console.log("[Website] - Loaded")
})