var mongoose = require("mongoose");
const Covtest = require('../models/Covtest')



var FileController = {};

//Upload File
FileController.upload = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(404).send(`<h1>NO FILES UPLOADED</h1>`);
    }
    let sampleFile = req.files.file
    let uploadPath = "./public/uploads/" + sampleFile.name;

    //console.log(uploadPath)
        try {
            await Covtest.findOneAndUpdate({ code: req.params.id }, { resultFile: uploadPath })
            const result = await Covtest.find({ code: req.params.id })

            const rr = await Covtest.find({ code: req.params.id },'description' )
            console.log(rr)
            sampleFile.mv(uploadPath, function (err) {
                if (err)
                    return res.status(500).send(err);
        
                res.json(result);
            });
        }catch(err){
        console.log(err)
    }
}


FileController.download = async (req, res) =>{
    try{
        const result = await Covtest.findOne({ code: req.params.id })
        console.log(result.resultFile)
        if (result.resultFile === null || result.resultFile === []) {
            return res.status(404).send(`<h1>NO FILES UPLOADED</h1>`);
        }else{
            res.download(result.resultFile);
            console.log("File downloaded")
        }
    }catch(err){
        console.log(err)
    }
}

module.exports = FileController