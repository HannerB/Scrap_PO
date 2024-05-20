import express from 'express';
import { getScrapData } from '../controllers/scrapController.js';

const router = express.Router();

router.post('/data', getScrapData);

export default router;
