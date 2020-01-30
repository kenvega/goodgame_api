import express from 'express';
import { handleSearch } from './search.controller.js';

const router = express.Router();

router.route('/').get(handleSearch);

export default router;
