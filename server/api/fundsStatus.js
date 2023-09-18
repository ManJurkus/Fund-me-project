import express from 'express';
import { connection } from '../setupDb.js';

export const fundsStatus = express.Router();


fundsStatus.get('/', async (req, res) => {

        const selectQuery = `SELECT status FROM block;`;

        try {
            const selectRes = await connection.execute(selectQuery);
            const statuslist = selectRes[0].map(status => status.status)
    
            return res.status(200).json({
                status: 'ok',
                list: statuslist,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'err',
                msg: 'GET: Funds Status API - server error.',
            });
        }
});


fundsStatus.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "fundsStatus" method' });
});