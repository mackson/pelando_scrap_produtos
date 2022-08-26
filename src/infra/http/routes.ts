import { Router } from 'express';
import { processProductController } from '../../application/usecases/product/process';

const router = Router();

router.post('/product/scrap', (request, response) => {
  return processProductController.handle(request, response);
});


export { router };