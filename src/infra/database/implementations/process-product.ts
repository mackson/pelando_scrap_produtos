import { PrismaClient } from '@prisma/client';
import { ProductRepository } from '../../../application/repositories/ProductRepository';
import { Product } from '../../../domain/entities/product';

export class PrismaProductRepository implements ProductRepository{

  private prisma: any = new PrismaClient();

  async save(product: Product): Promise<Product> {
    const operation = await this.prisma.product.upsert({
      where: {
        url: product.url,
      },
      update: product,
      create: product,
    });

    // console.log('Save', operation);
    this.prisma.$disconnect();
    return operation;

  }

  async findByUrl(url: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: {
        url: url
      }
    });

    // console.log('Find', product);
    this.prisma.$disconnect();
    return product;
  }
}
