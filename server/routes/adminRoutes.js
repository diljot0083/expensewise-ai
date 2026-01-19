import express from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';

const router = express.Router();

router.get('/settings', auth, admin, getAdminSettings);
router.post('/settings', auth, admin, updateAdminSettings);

export default router;
