const fs = require("fs");

module.exports = {
    name: "/login", // add the url path where its located " / " is the main one aka index


    run: async (req, res) => {


    delete require.cache[require.resolve("../html/login.ejs")] // file to page

    let objects = {
      //add objects
      fs: fs
    }
    res.render("../website/html/login.ejs", objects) // file to page

    }
}