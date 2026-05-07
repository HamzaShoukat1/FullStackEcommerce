import { IsString, IsNumber, IsArray, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';



export class lineItems {
    @IsString()
    name!: string;

    @IsNumber()
    price!: number;

    @IsNumber()
    quantity!: number;
}
export class StripeSessionResponseDto {
  @IsString()
  id!: string;

  @IsString()
  status!: string;

  @IsNumber()
  amount_total!: number;

  @IsString()
  customer_email!: string;

  @IsArray()
  @ValidateNested({each:true})
  @Type(()=> lineItems)
  items!:lineItems[]

  
}
