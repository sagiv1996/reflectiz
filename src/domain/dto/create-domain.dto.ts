import { IsFQDN, IsNotEmpty } from 'class-validator';

export class CreateDomainDto {
  @IsFQDN()
  @IsNotEmpty()
  path: string;
}
