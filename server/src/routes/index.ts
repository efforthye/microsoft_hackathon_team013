import express, { Router } from 'express';
import axios from 'axios';
import { logger } from '../utils/logger';
const url = '/api';

const router: Router = express.Router();

router.get('/html', async (req, res)=>{
    try {
        const {link} = req.query;
        if(!link || typeof link !== 'string') throw Error;
    
        const html = (await axios.get(link)).data;
        console.log({html});

        res.send(html);
    } catch (error) {
        res.status(400).send(error);
    }
});

export { router, url };