import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPDF } from './user-pdf.entity/user-pdf.entity';
import { UserPDFService } from './user-pdf.service';
import { UserPDFController } from './user-pdf.controller';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPDF, User])],
  controllers: [UserPDFController],
  providers: [UserPDFService, UsersService],
  exports: [UserPDFService],
})
export class UserPDFModule {}

