import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {WorkStatusType} from "../../common/types/workTypes";
import {UsersModel} from "../../users/entities/user.entity";

@Entity()
export class WorksModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersModel, (user) => user.works)
  author: UsersModel;

  @Column()
  workName: string;

  @Column()
  workDescription: string;

  @Column()
  workDueDate: string;

  @Column()
  workDueTime: string;

  @Column()
  workStatus: WorkStatusType;
}