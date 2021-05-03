import { Router } from 'express';

import MunicipioController from '../controllers/MunicipioController';

const router = Router();

router.get('/getSvg/:municipio', MunicipioController.getSvg);
router.get('/getViewBox/:municipio', MunicipioController.getViewBox);

export default router;
