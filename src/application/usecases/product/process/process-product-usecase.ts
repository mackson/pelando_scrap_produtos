// import { Product } from '../../../../domain/entities/product';
import { ProductRepository } from '../../../repositories/ProductRepository';
import { validate } from 'class-validator';
import { ProductScraping } from '../../../../infra/webscraping/product-scraping';
import moment from 'moment';

export class ProcessProductUseCase {
  //Dependency Inversion by SOLID
  constructor(
    private productRepository: ProductRepository
  ){}

  async execute(url: string){
    const productAlreadyExists = await this.productRepository.findByUrl(url);

    let lessThanOneHourAgo = false;

    if(productAlreadyExists){
      lessThanOneHourAgo = moment(productAlreadyExists.updatedAt)
        .isAfter(
          moment().subtract(1, 'hours')
        );
    }

    // Get in database if url already exists and if updatedAt is less than 1h
    if(lessThanOneHourAgo){

      return productAlreadyExists;

    } else {

      // Implements Webscraping by url and get product data
      const newProduct = await new ProductScraping().handle(url);
      
      const errors = await validate(newProduct);
      if (errors.length > 0) {
        const errorsMessages = errors.map(error => Object.values(error.constraints).toString());
        throw new Error(`Product Scrap Failed to that Store, Validation failed! ${errorsMessages}`);
      }

      await this.productRepository.save(newProduct);

      return newProduct;
    }
  }
}