import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
import { CreateOrUpdateUserDto } from './user.dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['pdfs'],
    });
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async createUser(dto: CreateOrUpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existingUser) throw new ConflictException('El correo ya está registrado');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = this.userRepository.create({ ...dto, password: hashedPassword });
    return await this.userRepository.save(newUser);
  }

  async updateUser(id: number, dto: CreateOrUpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    Object.assign(user, dto);
    return await this.userRepository.save(user);
  }

  async softDeleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    user.is_deleted = true;
    await this.userRepository.save(user);
  }

  async restartSoftDelete(id: number): Promise<User> {
    const user = await this.getUserById(id);
    if (!user.is_deleted) throw new ConflictException('El usuario ya está activo');
  
    user.is_deleted = false;
    return await this.userRepository.save(user);
  }  

  async changeUserRole(id: number, newRole: 'normal' | 'administrador'): Promise<User> {
    const user = await this.getUserById(id);
    user.type_user = newRole;
    return await this.userRepository.save(user);
  }
}

