import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProductDto: Prisma.ProductCreateInput) {
    const validity = new Date(createProductDto.validity);
    return this.prismaService.product.create({
      data: { ...createProductDto, validity },
    });
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    const dataProduct = {
      where: { id },
    };
    const product = await this.prismaService.product.findUnique(dataProduct);

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const validity = new Date(updateProductDto.validity);

    const dataProduct = {
      where: { id },
      data: { ...updateProductDto, validity },
    };

    const product = await this.prismaService.product.update(dataProduct);

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async remove(id: number) {
    const serviceProduct = this.prismaService.product;

    const dataProduct = {
      where: { id },
    };

    const product = await serviceProduct.findUnique(dataProduct);

    if (!product) throw new NotFoundException('Product not found');

    await serviceProduct.delete(dataProduct);

    return 'Product successfully removed';
  }
}
