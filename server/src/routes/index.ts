import express, { Router } from 'express';
import { logger } from '../utils/logger';
const url = '/api';

const router: Router = express.Router();

export { router, url };