import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 유저 등록
  @Post()
  addUser(
    @Body('email')email: string,
    @Body('password')password: string,
  ) {
    return this.usersService.addUser({ email, password });
  }

  // TODO : 전체 유저 목록 가져오기 , 개발 편의 목적으로 추후 삭제
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
}
