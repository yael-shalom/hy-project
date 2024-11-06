import express from 'express'
import { v2 as cloudinary } from 'cloudinary';
import Path from 'path';
import { upload } from '../utils/uploadFile.js';
const router = express.Router();

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

router.get("/", (req, res) => {
    res.json({ msg: "upload work" })
})

router.post("/test1", async (req, res) => {
    try {

        let data = await upload(req, "myFile", "");
        res.json(data);

        // const myFile = req.files.myFile;
        // let exts_arr = [".png", ".jpg", ".jpeg", ".svg", ".gif"];
        // if (myFile.size <= 1024 * 1024 * 2) {
        //     let extFile = Path.extname(myFile.name);
        //     if (exts_arr.includes(extFile)) {
        //         const data = await cloudinary.uploader.upload(myFile.tempFilePath, { unique_filename: true })
        //         res.json(data);
        //         myFile.mv("public/" + myFile.name, (err) => {
        //             if (err)
        //                 return res.status(401).json({ msg: "error", err })
        //             res.json("file upload");
        //         });
        //     }
        //     else {
        //         res.status(400).json("file must be image, png, jpg, jpeg, svg, gif");
        //     }
        // }
        // else {
        //     res.status(400).json("file too big, maximum 2 mb");
        // }

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})

export default router
