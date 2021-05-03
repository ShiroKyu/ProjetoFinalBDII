import { Router } from 'express';

import PostController from '../controllers/PostController';

const router = Router();

router.post('/', PostController.store);
router.get('/', PostController.index);
router.delete('/:id', PostController.delete);

export default router;
