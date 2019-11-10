import express from 'express';
import { handleSuggestion } from './suggestion.controller.js';

const router = express.Router();

router.route('/').get(handleSuggestion);

export default router;
