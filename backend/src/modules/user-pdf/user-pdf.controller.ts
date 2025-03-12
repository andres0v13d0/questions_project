import {
    Controller,
    Post,
    Get,
    Delete,
    Param,
    ParseIntPipe,
    UploadedFile,
    UseInterceptors,
    NotFoundException,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { UserPDFService } from './user-pdf.service';
  import { UsersService } from '../users/users.service';
  import { Express } from 'express';
  
  @Controller('user-pdfs')
  export class UserPDFController {
    constructor(
      private readonly userPDFService: UserPDFService,
      private readonly usersService: UsersService,
    ) {}
  
    @Post(':userId/upload')
    @UseInterceptors(FileInterceptor('pdf'))
    async uploadUserPDF(
      @Param('userId', ParseIntPipe) userId: number,
      @UploadedFile() file: Express.Multer.File,
    ) {
      if (!file) {
        throw new NotFoundException('No se proporcionó ningún archivo');
      }
  
      const user = await this.usersService.getUserById(userId);
      if (!user) {
        throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
      }
  
      return await this.userPDFService.createOrUpdateUserPDF({
        userId,
        pdf: file.buffer,
      });
    }
  
    @Get(':userId')
    async getUserPDFs(@Param('userId', ParseIntPipe) userId: number) {
      return await this.userPDFService.getUserPDFs(userId);
    }
  
    @Delete(':pdfId')
    async deleteUserPDF(@Param('pdfId', ParseIntPipe) pdfId: number) {
      await this.userPDFService.deleteUserPDF(pdfId);
      return { message: 'PDF eliminado correctamente' };
    }
  }
  