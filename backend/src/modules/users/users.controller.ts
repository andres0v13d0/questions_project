import { 
    Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, UploadedFile, UseInterceptors 
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { CreateOrUpdateUserDto } from './user.dto/user.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { FileInterceptor } from '@nestjs/platform-express';
  
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllUsers() {
      return await this.usersService.getAllUsers();
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUserById(@Param('id') id: number) {
      return await this.usersService.getUserById(id);
    }
  
    @Post()
    async createUser(@Body() dto: CreateOrUpdateUserDto) {
      return await this.usersService.createUser(dto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() dto: CreateOrUpdateUserDto) {
      return await this.usersService.updateUser(id, dto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async softDeleteUser(@Param('id') id: number) {
      return await this.usersService.softDeleteUser(id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Put(':id/role')
    async changeUserRole(@Param('id') id: number, @Body('newRole') newRole: 'normal' | 'administrador') {
      return await this.usersService.changeUserRole(id, newRole);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post(':id/pdf')
    @UseInterceptors(FileInterceptor('pdf'))
    async uploadPdf(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
      console.log(file);
      return await this.usersService.saveUserPdf(id, file.buffer);
    }
  }
  
