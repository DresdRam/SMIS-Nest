import { Module } from '@nestjs/common';
import { ConfineController } from './confine.controller';
import { ConfineService } from './confine.service';
import { Confine } from './confine.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Confine])],
  controllers: [ConfineController],
  providers: [ConfineService]
})
export class ConfineModule {}
