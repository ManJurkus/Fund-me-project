
import express from 'express';
import { register } from './register.js';
import { login } from './login.js';
import { logout } from './logout.js';
import { funds } from './funds.js';
import { upload } from './upload.js';
import { donation } from './donation.js';
import { fundsPublic } from './fundsPublic.js';
import { fundReceived } from './fundReceived.js';


export const api = express.Router();

api.all('/', (req, res) => {
    return res.json({
        msg: 'Incomplete URL',
    });
});

api.use('/register', register);
api.use('/login', login);
api.use('/logout', logout);
api.use('/funds', funds);
api.use('/fundsPublic', fundsPublic);
api.use('/fundReceived', fundReceived);
api.use('/upload', upload);
api.use('/donation', donation);