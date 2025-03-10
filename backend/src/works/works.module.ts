import { Module } from '@nestjs/common';
import { WorksService } from './works.service';
import { WorksController } from './works.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {WorksModel} from "./entities/work.entity";

@Module({
  imports: [TypeOrmModule.forFeature([WorksModel])],
  controllers: [WorksController],
  providers: [WorksService],
})
export class WorksModule {}
