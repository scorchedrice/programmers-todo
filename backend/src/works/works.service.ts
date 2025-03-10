import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {WorksModel} from "./entities/work.entity";
import {Repository} from "typeorm";
import {WorkStatusType} from "../common/types/workTypes";
import {NotFoundError} from "rxjs";

@Injectable()
export class WorksService {
 constructor(
   @InjectRepository(WorksModel)
   private worksRepository: Repository<WorksModel>,
 ) {}

  // 1. 모든 todos 확인하기
  async getAllWorks() {
   return this.worksRepository.find();
  }

  // 2. 특정 work 상태 바꾸기
  async updateWorkStatus(id: number, newStatus: WorkStatusType) {
   const work = await this.worksRepository.findOne({
     where: {
       id,
     }
   });
   // work를 찾지 못함.
    if (!work) {
      throw new NotFoundError('해당 work를 찾을 수 없어요.')
    }

    work.workStatus = newStatus;
    const newWork = await this.worksRepository.save(work);
    return newWork;
  }

  async updateWork(id: number, newWorkName?: string, newWorkDescription?: string) {
   const work = await this.worksRepository.findOne({
     where: {
       id,
     }
   });
    console.log(newWorkName, newWorkDescription)
   if (!work) {
     throw new NotFoundError('해당 work를 찾을 수 없어요.')
   }

   if (newWorkName) {
     work.workName = newWorkName;
   }

   if (newWorkDescription) {
     work.workDescription = newWorkDescription;
   }

   const newWork = await this.worksRepository.save(work);
   return newWork;
  }

  // 3. 특정 work를 지움.
  async deleteWork(id: number) {
   const work = await this.worksRepository.findOne({
     where: {
       id,
     }
   });
   // 지울 work를 찾지 못함.
   if (!work) {
     throw new NotFoundError('해당 work를 찾을 수 없어요.')
   }

   await this.worksRepository.delete(id);
   return `${id}번 work를 삭제했어요.`;
  }

  // 4. work 생성
  async createWork(workName: string, workDescription: string) {
   const work = this.worksRepository.create({
     workName,
     workDescription,
     workStatus: 'SCHEDULED',
   });
   const newWork = await this.worksRepository.save(work);
   return newWork
  }
}
