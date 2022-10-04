const fs = require("fs");

module.exports = {
    name: "/:test", // add the url path where its located " / " is the main one aka index


    run: async (req, res) => {


    delete require.cache[require.resolve("../html/index.ejs")] // file to page

    let objects = {
      //add objects
      param: req.params.test
    }
    res.render("../website/html/staticFile.ejs", objects) // file to page

    }
}