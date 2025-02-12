import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<{ accessToken: string; redirectUrl: string }> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user || user.is_deleted === true || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas o usuario eliminado');
    }

    const payload = { id: user.id, typeUser: user.type_user };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    });

    const redirectUrl = user.type_user === 'administrador' ? '/dashboard' : '/inicio';

    return { accessToken, redirectUrl };
  }
}
