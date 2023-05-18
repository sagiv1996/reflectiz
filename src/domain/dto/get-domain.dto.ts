import { IsFQDN, IsNotEmpty } from 'class-validator';

export class GetDomainDto {
  @IsFQDN()
  @IsNotEmpty()
  path: string;
}
