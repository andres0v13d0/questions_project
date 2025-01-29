// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';  // Importa JwtModule
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Asegúrate de usar el secret de tu .env
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN, // Configura el tiempo de expiración
      },
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Esto exporta el UsersService
})
export class UsersModule {}


