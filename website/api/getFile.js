const fs = require("fs");
const multer  = require('multer')
const upload = multer()
const { v4: uuidv4 } = require('uuid');

module.exports = {
    name: "/getfile", // add the url path where its located " / " is the main one aka index
    multer: upload.single("files[]"),
    run: async (req, res) => {


    delete require.cache[require.resolve("../html/login.ejs")] // file to page

    console.log(req.file)
    let uuid = uuidv4()
    await fs.writeFile("./public/data/uploads/" + uuid + ".zip", req.file.buffer, (err) => {
        console.error(err)
    })

    res.send({ receive: true, uuid: uuid })

    }
}