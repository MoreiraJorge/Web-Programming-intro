const Covtest = require('../models/Covtest')
const fs = require('fs');
const path = require('path');

var FileController = {};

//Upload File (tech)
FileController.upload = async (req, res) => {

    console.log(req.file)

    let path = "/uploads/"

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }

    let uploadPath = path + req.file.filename;

    try {
        const result = await Covtest.findOneAndUpdate({ code: req.params.id }, { resultFile: uploadPath }, { new: true })
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
        console.log(err)
    }
}

//Download file (tech)
FileController.download = async (req, res) => {

    try {
        const result = await Covtest.findOne({ code: req.params.id })
        if (result.resultFile === null || result.resultFile === []) {
            return res.status(404).send(`<h1>NO FILES UPLOADED</h1>`);
        } else {
            //const file = path.join(__dirname, '../../public', result.resultFile)
            //console.log(file)
            res.send(`{"url": "http://localhost:3000${result.resultFile}"}`);
            //res.download(file)
            console.log("File downloaded")
        }
    } catch (err) {
        console.log(err)
    }

}

module.exports = FileController