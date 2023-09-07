import express from 'express';
import { connection } from '../setupDb.js';

const donation = express.Router();

donation.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);

   
    try {
        const selectQuery = `SELECT * FROM donation WHERE fundId = ?;`
        const selectRes = await connection.execute(selectQuery, [id]);
        const donationList = selectRes[0];

        console.log(donationList);

        return res.status(200).json({
            status: 'ok',
            list: donationList,
        });
    } catch (error) {

    }


});

donation.post('/', async (req, res) => {
    const { fundId, name, donation, } = req.body;

    try {
        const insertQuery = `INSERT INTO donation (fundId, name, donation) VALUES (?, ?, ?)`;
        const insertRes = await connection.execute(insertQuery, [fundId, name, donation]);
        const insertResDonation = insertRes[0];

        console.log(insertResDonation);

        if (insertResDonation.affectedRows > 0) {
            return res.status(200).json({
                status: 'ok',
                msg: 'Donation received.',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'Donation did not received.',
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'POST: Donation API - server error.',
        });
    }
});

export { donation };