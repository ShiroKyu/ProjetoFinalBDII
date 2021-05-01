import { Router } from 'express';

import StudentController from '../controllers/StudentController';

const router = Router();

// router.post('/', StudentController.store);
// router.get('/:email', StudentController.show);
router.get('/', StudentController.index);
// router.put('/:id', StudentController.update);
// router.delete('/:id', StudentController.delete);

export default router;
