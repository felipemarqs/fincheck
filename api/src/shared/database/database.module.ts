import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRpository } from './repositories/users.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRpository],
  exports: [UsersRpository],
})
export class DatabaseModule {}
