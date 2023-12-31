import { MinLength, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @IsString({ message: 'A nome precisa ser uma String!' })
  @IsNotEmpty({ message: 'O nome é obrigatória1!' })
  name: string;

  @IsString({ message: 'A email precisa ser uma String!' })
  @IsNotEmpty({ message: 'O email é obrigatório!' })
  @IsEmail()
  email: string;

  @IsString({ message: 'A senha precisa ser uma String!' })
  @IsNotEmpty({ message: 'A senha é obrigatória!' })
  @MinLength(8)
  password: string;
}
