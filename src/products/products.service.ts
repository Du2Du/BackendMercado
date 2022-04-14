import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from '../../prisma';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  private notFoundResponse() {
    throw new NotFoundException('Product not found');
  }
  private serviceProduct = this.prismaService.product;

  create(createProductDto: Prisma.ProductCreateInput) {
    const validity = new Date(createProductDto.validity);
    return this.serviceProduct.create({
      data: { ...createProductDto, validity },
    });
  }

  findAll() {
    return this.serviceProduct.findMany();
  }

  async findOne(id: number) {
    const dataProduct = {
      where: { id },
    };
    const product = await this.serviceProduct.findUnique(dataProduct);

    if (!product) this.notFoundResponse();

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const validity = new Date(updateProductDto.validity);

    const dataProduct = {
      where: { id },
      data: { ...updateProductDto, validity },
    };

    const product = await this.serviceProduct.update(dataProduct);

    if (!product) this.notFoundResponse();

    return product;
  }

  async remove(id: number) {
    const dataProduct = {
      where: { id },
    };

    const product = await this.serviceProduct.findUnique(dataProduct);

    if (!product) this.notFoundResponse();

    await this.serviceProduct.delete(dataProduct);

    return 'Product successfully removed';
  }
}
