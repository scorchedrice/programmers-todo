import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersModel} from "./entities/user.entity";
import {Repository} from "typeorm";
import {UsersModule} from "./users.module";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) {}

  // TODO : 실제 서비스에선 제거해야하는 기능임. 개발편의 목적으로 전체 유저 반환
  async getAllUsers() {
    return this.usersRepository.find();
  }

  // 유저 등록
  async addUser(
    userData: Pick<UsersModel, 'email' | 'password'>, // email, password으로만 구성된 userData를 건네받음
  ) {
    // 이메일 중복 확인
    const existingEmail = await this.usersRepository.exists({
      where: {
        email: userData.email,
      },
    });
    if (existingEmail) {
      throw new BadRequestException('이미 등록된 이메일입니다.')
    }

    const userObject = this.usersRepository.create({
      email: userData.email,
      password: userData.password,
    });
    const newUser = await this.usersRepository.save(userObject);
    return newUser;
  }

  // email로 유저 확인하기
  async getUserByEmail(email: string) {
    const target = await this.usersRepository.findOne({
      where: {
        email,
      }
    })
    return target;
  }
}
