import { IsDate, IsDateString, IsEnum, IsNotEmpty } from 'class-validator';

enum ProductCategoryTypes {
  FOOD = 'FOOD',
  CLEANING_PRODUCT = 'CLEANING_PRODUCT',
}
export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsDateString()
  validity: Date;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  @IsEnum(ProductCategoryTypes)
  category: ProductCategoryTypes;
}
