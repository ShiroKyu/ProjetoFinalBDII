import { Router } from 'express';

import PostController from '../controllers/PostController';

const router = Router();

router.post('/', PostController.store);
// router.get('/:id', PostController.show);
router.get('/', PostController.index);
// router.put('/:id', PostController.update);
// router.delete('/:id', PostController.delete);

export default router;
