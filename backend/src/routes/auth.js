import { Router } from 'express';

import LoginController from '../controllers/LoginController';

const router = Router();

router.post('/checklogin', LoginController.checkLogin);
router.post('/logout', LoginController.logout);
router.post('/login', LoginController.login);
router.post('/register', LoginController.register);

export default router;
