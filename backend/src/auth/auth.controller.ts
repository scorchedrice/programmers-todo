import {Controller, Post, Headers, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token/access')
  postTokenAccess(
      @Headers('authorization') rawToken: string,
    ) {
      const token = this.authService.extractTokenFromHeader(rawToken, true);
      // accessToken : { token }
      const newToken = this.authService.rotateToken(token, false);
      return {
        accessToken: newToken
    }
  }

  @Post('token/refresh')
  postTokenRefresh(
    @Headers('authroization') rawToken: string,) {
    const token = this.authService.extractTokenFromHeader(rawToken, true);
    const newToken = this.authService.rotateToken(token, true);
    return {
      refreshToken: newToken,
    }
  }

  @Post('login/email')
  postLoginEmail(
    @Headers('authorization') rawToken: string,
    @Body('email') email: string,
    @Body('password')password: string,
  ) {
    const token = this.authService.extractTokenFromHeader(rawToken, false);
    const credentials = this.authService.decodedBasicToken(token);
    return this.authService.loginWithEmail(credentials);
  }

  @Post('register/email')
  postRegisterEmail(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authService.registerWithEmail({email, password});
  }
}
