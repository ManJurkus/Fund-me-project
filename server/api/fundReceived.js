import express from 'express';
import { connection } from '../setupDb.js';

export const fundReceived = express.Router();


fundReceived.get('/', async (req, res) => {

        const selectQuery = `SELECT
                            f.id AS fund_id,
                            f.user_id AS fund_user_id,
                            f.title AS fund_title,
                            f.fundText AS fund_text,
                            f.is_blocked_fund AS fund_block,
                            f.image AS fund_image,
                            f.fundSum AS fund_goal,
                            SUM(d.donation) AS total_donation
                            FROM funds AS f
                            LEFT JOIN donation AS d ON f.id = d.fundId
                            GROUP BY f.id, f.user_id, f.title, f.fundText, f.fundSum, f.is_blocked_fund, f.image
                            ORDER BY f.id;`;

        try {
            const selectRes = await connection.execute(selectQuery);
            const fundslist = selectRes[0];
    
            return res.status(200).json({
                status: 'ok',
                list: fundslist,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 'err',
                msg: 'GET: FundReceived (Public) API - server error.',
            });
        }
});



fundReceived.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "fundReceived" method' });
});