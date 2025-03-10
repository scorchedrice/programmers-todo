import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorksModule } from './works/works.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {WorksModel} from "./works/entities/work.entity";
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT as string),
      username: process.env.DB_USERNAME as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_DATABASE as string,
      entities: [WorksModel],
      synchronize: true,
    }),
    WorksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
