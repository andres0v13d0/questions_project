import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPDF } from './user-pdf.entity/user-pdf.entity';
import { User } from '../users/user.entity/user.entity';
import { CreateOrUpdateUserPDFDto } from './user-pdf.dto/user-pdf.dto';

@Injectable()
export class UserPDFService {
  constructor(
    @InjectRepository(UserPDF)
    private readonly userPDFRepository: Repository<UserPDF>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createOrUpdateUserPDF(dto: CreateOrUpdateUserPDFDto): Promise<UserPDF> {
    const user = await this.userRepository.findOne({ where: { id: dto.userId } });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${dto.userId} no encontrado`);
    }

    const userPDF = this.userPDFRepository.create({
      user,
      pdf: dto.pdf,
    });

    return await this.userPDFRepository.save(userPDF);
  }

  async getUserPDFs(userId: number): Promise<UserPDF[]> {
    return await this.userPDFRepository.find({
      where: { user: { id: userId } },
      order: { uploaded_at: 'DESC' },
    });
  }

  async deleteUserPDF(pdfId: number): Promise<void> {
    const result = await this.userPDFRepository.delete(pdfId);
    
    if (result.affected === 0) {
      throw new NotFoundException(`PDF con ID ${pdfId} no encontrado`);
    }
  }
}
