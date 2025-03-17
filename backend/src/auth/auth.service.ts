import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {UsersModel} from "../users/entities/user.entity";
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, // jwt 주입
    private readonly usersService: UsersService, // usersService 주입
  ) {}

  // 프론트엔드에서 보낸 authorization 요청을 해석하여 토큰을 추출하는 로직
  extractTokenFromHeader(header: string, isBearer: boolean) {
    const splitToken = header.split(' '); // FE에서 Bearer {TOKEN} 형태로 요청을 보낼것임.
    const prefix = isBearer ? 'Bearer' : 'Basic'; // isBearer true라면 Bearer라고 인식
    if (splitToken.length !== 2 || splitToken[0] !== prefix) {
      throw new UnauthorizedException(
        'Header에 잘못된 토큰 유형을 담아 요청했어요.'
      )
    }
    const token = splitToken[1];
    return token;
  }

  // 토큰의 유효성을 판단하는 로직
  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }

  // 토큰 등록 과정 (refresh, access 발급)
  signToken(user: Pick<UsersModel, 'email'|'id'>, isRefreshToken: boolean) {
    const payload = {
      email: user.email,
      id: user.id,
      type: isRefreshToken ? 'refresh' : 'access',
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: isRefreshToken ? 3600 : 300,
    })
  }

  // 토큰 재발급
  rotateToken(token: string, isRefreshToken: boolean) {
    const decoded = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    })

    if (decoded.type !== 'refresh') {
      throw new UnauthorizedException(
        '토큰 재발급 요청을 하실 땐 refresh 토큰으로 해야해요.'
      );
    }

    return this.signToken(
      {
        ...decoded,
      },
      isRefreshToken,
    )
  }

  // email:password => [email, password]
  decodedBasicToken(base64String: string) {
    const decoded = Buffer.from(base64String, 'base64').toString('utf8');
    const split = decoded.split(':');
    if (split.length !== 2) {
      throw new UnauthorizedException(
        'Header에 잘못된 토큰 형식을 담아 요청했어요.'
      )
    }
    const email = split[0];
    const password = split[1];
    return {
      email,
      password,
    }
  }

  // 여기부터 로그인 관련 로직
  async authenticateWithEmailAndPassword(
    user: Pick<UsersModel, 'email'|'password'>,
  ) {
    const existingUser = await this.usersService.getUserByEmail(user.email);
    if (!existingUser) {
      throw new UnauthorizedException('사용자가 존재하지 않아요.')
    }

    // 위의 조건문 통과 => id는 유효 => 비밀번호 비교 수행
    const checkPassword = await bcrypt.compare(
      user.password,
      existingUser.password,
    );

    if (!checkPassword) {
      throw new UnauthorizedException('비밀번호가 달라요.')
    }

    // 위의 조건문을 통과하면 유효한 아이디와 비밀번호임.
    return existingUser;
  }

  async loginWithEmail(user: Pick<UsersModel, 'email'|'password'>) {
    const existingUser = await this.authenticateWithEmailAndPassword(user);
    return this.loginUser(existingUser)
  }

  loginUser(user: Pick<UsersModel, 'email'|'id'>) {
    return {
      accessToken: this.signToken(user, false), // access
      refreshToken: this.signToken(user, true), // refresh
    };
  }

  async registerWithEmail(user: Pick<UsersModel, 'email'|'password'>) {
    const hash = await bcrypt.hash(user.password, parseInt(process.env.HASH_ROUNDS as string));
    const newUser = await this.usersService.addUser({
      email: user.email,
      password: hash,
    });
    return this.loginUser(newUser);
  }
}
