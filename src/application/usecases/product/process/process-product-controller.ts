import { Request, Response } from 'express';
import { ProcessProductUseCase } from './process-product-usecase';

export class ProcessProductController{
  constructor(
    private processProductUseCase: ProcessProductUseCase
  ){}

  async handle(request: Request, response: Response): Promise<Response>{
    try{
      // Get Url from POST API
      const url = request.body.url;

      const product = await this.processProductUseCase.execute(url);

      return response.json(product);
    }catch(error){

      return response.json({
        error: error.message || 'Unexpected error',
      });
      
    }
  }
}

