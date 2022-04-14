import { User } from './entities/user.entity';
import {
  BadRequestException,
  HttpException, Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }
  create(createUserDto: CreateUserDto) {
    const birth_date = new Date(createUserDto.birth_date);
    return this.prismaService.user.create({
      data: { ...createUserDto, birth_date },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    const dataUser = {
      where: { id },
    };
    const user = await this.prismaService.user.findUnique(dataUser);

    if (!user) throw new NotFoundException('Product not found');

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const birth_date = new Date(updateUserDto.birth_date);

    const dataUser = {
      where: { id },
      data: { ...updateUserDto, birth_date },
    };

    const user = await this.prismaService.user.update(dataUser);

    if (!user) throw new NotFoundException('Product not found');

    return user;
  }

  async remove(id: number) {
    const serviceUser = this.prismaService.user;

    const dataUser = {
      where: { id },
    };

    const user = await serviceUser.findUnique(dataUser);

    if (!user) throw new NotFoundException('Product not found');

    await serviceUser.delete(dataUser);

    return 'Product successfully removed';
  }
}
