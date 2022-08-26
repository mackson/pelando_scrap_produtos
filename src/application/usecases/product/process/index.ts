import { PrismaProductRepository } from '../../../../infra/database/implementations/process-product';
import { ProcessProductController } from '../../../../application/usecases/product/process/process-product-controller';
import { ProcessProductUseCase } from '../../../../application/usecases/product/process/process-product-usecase';

const prismaProductRepository = new PrismaProductRepository();

const processProductUseCase = new ProcessProductUseCase(
  prismaProductRepository,
);

const processProductController = new ProcessProductController(
  processProductUseCase,
);

export { processProductUseCase, processProductController };