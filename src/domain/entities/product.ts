import { ProductDTO } from '../dtos/ProductDTO';
import { IsNotEmpty } from 'class-validator';

export class Product {
  @IsNotEmpty({ message:'Product title is required' })
  public title: string;
  @IsNotEmpty({ message:'Product image is required' })
  public image: string;
  @IsNotEmpty({ message:'Product price is required' })
  public price: string;
  @IsNotEmpty({ message:'Product description is required' })
  public description: string;
  @IsNotEmpty({ message:'Product url is required' })
  public url: string;
  public updatedAt: Date;
  
  constructor(props: ProductDTO){
    Object.assign(this, props);
  }
}