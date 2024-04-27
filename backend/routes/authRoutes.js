import express from 'express';
import send_auth from '../controller/authController.js';

const router = express.Router();

router.post("/send", send_auth);

export default router;