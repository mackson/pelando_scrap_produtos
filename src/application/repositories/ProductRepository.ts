import { Product } from '../../domain/entities/product';

export interface ProductRepository{
  findByUrl(url: string): Promise<Product> | null;
  save(product: Product): Promise<Product> | null;
}