import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {WorkStatusType} from "../../common/types/workTypes";

@Entity()
export class WorksModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  workName: string;

  @Column()
  workDescription: string;

  @Column()
  workStatus: WorkStatusType;
}