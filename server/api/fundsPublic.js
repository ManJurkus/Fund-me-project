import express from 'express';
import { connection } from '../setupDb.js';

export const fundsPublic = express.Router();


fundsPublic.get('/', async (req, res) => {

        const selectQuery = `SELECT * FROM funds WHERE is_blocked_fund = 2;`;

        try {
            const selectRes = await connection.execute(selectQuery);
            const fundslist = selectRes[0];
    
            return res.status(200).json({
                status: 'ok',
                list: fundslist,
            });
        } catch (error) {
            return res.status(500).json({
                status: 'err',
                msg: 'GET: Funds (Public) API - server error.',
            });
        }
});

//     const { carId } = req.params;

//     try {
//         const selectQuery = `SELECT cars.id, cars.title, \`car-types\`.title as carType, cars.image, 
//                                 cars.price, cars.color, cars.location, \`steering-wheel\`.side as steeringWheel
//                             FROM cars
//                             INNER JOIN \`car-types\` ON \`car-types\`.id = cars.car_type_id
//                             INNER JOIN \`steering-wheel\` ON \`steering-wheel\`.id = cars.steering_wheel_id
//                             WHERE cars.id = ?;`;
//         const selectRes = await connection.execute(selectQuery, [carId]);
//         const cars = selectRes[0];

//         return res.status(200).json({
//             status: 'ok',
//             car: cars[0],
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             status: 'err',
//             msg: 'GET: CAR TYPES API - server error.',
//         });
//     }
// });

fundsPublic.use((req, res, next) => {
    return res.status(404).json({ msg: 'Unsupported "fundsPublic" method' });
});