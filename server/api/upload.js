import path from 'path';
import express from 'express';
import multer from 'multer';

export const upload = express.Router();

/*******/
/* Fund */
/*******/

const fundStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/fund');
    },
    filename: (req, file, cb) => {
        cb(null, 'fund_' + Date.now() + path.extname(file.originalname));
    },
});
const fundUpload = multer({
    storage: fundStorage,
    limits: {
        fileSize: 1e7,
    },
});

upload.use('/fund', fundUpload.single('fund_image'), (req, res) => {
    return res.status(201).json({
        status: 'ok',
        msg: 'Upload complete.',
        path: 'images/fund/' + req.file.filename,
    });
});


/***********/

upload.use('/', (req, res) => {
    return res.status(400).json({
        status: 'err',
        msg: 'Upsupported "Upload" route.',
        options: [
            'http://localhost:3001/api/upload/fund',
        ],
    });
});

upload.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "Upload" method' });
});