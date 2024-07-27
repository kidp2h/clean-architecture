import { Module } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/prisma';

@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
