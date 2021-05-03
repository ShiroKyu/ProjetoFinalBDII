import { Router } from 'express';

import StudentController from '../controllers/StudentController';

const router = Router();

router.get('/', StudentController.index);

export default router;
