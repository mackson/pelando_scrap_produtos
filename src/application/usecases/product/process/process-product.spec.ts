import { Product } from '../../../../domain/entities/product';
import { PrismaProductRepository } from '../../../../infra/database/implementations/process-product';
import { ProcessProductUseCase } from './process-product-usecase';

describe('Process Webscraping and Include a new Product usecase', () => {
  it('Should be able to process webscraping and include a new product', async () => {
    const prismaProductRepository = new PrismaProductRepository();

    const processProductUseCase = new ProcessProductUseCase(
      prismaProductRepository
    );

    const storeUrl = 'https://www.saraiva.com.br/mindset-9404582/p';

    const response: Product = await processProductUseCase.execute(storeUrl);

    console.log('Product', response);

    expect(response).toMatchObject(response);

  });
});

process.once('SIGUSR2', 
  function () { 
    process.kill(process.pid, 'SIGUSR2'); 
  }
);