import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [JwtModule.register({
    secret: "unsecure_jwt_secret",
    signOptions: { expiresIn: '7d' },
  }),],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
