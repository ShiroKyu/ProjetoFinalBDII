import { Router } from 'express';

import CursoController from '../controllers/CursoController';

const router = Router();

router.get('/', CursoController.index);

export default router;
