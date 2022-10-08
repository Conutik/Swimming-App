const fs = require("fs");
const axios = require("axios")

module.exports = {
    name: "/", // add the url path where its located " / " is the main one aka index


    run: async (req, res) => {

      let data = await axios.post("http://localhost:3000/api/validate", { cookie: req.cookies.session })
      if(data.data.error) res.redirect("/login")


    delete require.cache[require.resolve("../html/index.ejs")] // file to page

    let objects = {
      //add objects
      fs: fs
    }
    res.render("../website/html/index.ejs", objects) // file to page

    }
}