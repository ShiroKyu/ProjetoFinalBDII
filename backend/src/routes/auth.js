import { Router } from 'express';

import LoginController from '../controllers/LoginController';

const router = Router();

router.get('/checklogin', LoginController.checkLogin);
router.get('/logout', LoginController.logout);
router.post('/login', LoginController.login);
router.post('/register', LoginController.register);

export default router;
