import { Router } from 'express';

import EstadoController from '../controllers/EstadoController';

const router = Router();

// router.post('/', PostController.store);
// router.get('/:id', PostController.show);
router.get('/', EstadoController.index);
// router.put('/:id', PostController.update);
// router.delete('/:id', PostController.delete);

export default router;
