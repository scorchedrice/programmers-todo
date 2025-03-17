import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { WorksService } from './works.service';
import { WorkStatusType } from '../common/types/workTypes';

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Get()
  getWorks() {
    return this.worksService.getAllWorks();
  }

  @Patch(':id')
  updateWorkStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('newStatus') newStatus: WorkStatusType,
  ) {
    return this.worksService.updateWorkStatus(id, newStatus);
  }

  @Post()
  createWork(
    @Body('workName') workName: string,
    @Body('workDescription') workDescription: string,
    @Body('workDueDate') workDueDate: string,
    @Body('workDueTime') workDueTime: string,
  ) {
    return this.worksService.createWork(workName, workDescription, workDueDate, workDueTime);
  }

  @Put(':id')
  updateWork(
    @Param('id', ParseIntPipe) id: number,
    @Body('newWorkName') newWorkName?: string,
    @Body('newWorkDescription') newWorkDescription?: string,
  ) {
    return this.worksService.updateWork(id, newWorkName, newWorkDescription);
  }

  @Delete(':id')
  deleteWork(@Param('id', ParseIntPipe) id: number) {
    return this.worksService.deleteWork(id);
  }
}
