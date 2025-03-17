import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {WorksModel} from "../../works/entities/work.entity";

@Entity()
export class UsersModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => WorksModel, (work) => work.author)
  works: WorksModel[];
}