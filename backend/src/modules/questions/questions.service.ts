import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity/question.entity';
import { CreateQuestionDto, UpdateQuestionDto } from './question.dto/question.dto';
import { Item } from '../items/item.entity/item.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const { content, itemId } = createQuestionDto;

    const item = await this.itemRepository.findOne({ where: { id: itemId, isDeleted: false } });
    if (!item) {
      throw new BadRequestException(`El ítem con ID ${itemId} no existe o está eliminado.`);
    }

    const question = this.questionRepository.create({ content, item });
    return this.questionRepository.save(question);
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find({ relations: ['item'] });
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne({ where: { id }, relations: ['item'] });
    if (!question) {
      throw new NotFoundException(`Pregunta con ID ${id} no encontrada.`);
    }
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    const question = await this.findOne(id);

    if (updateQuestionDto.itemId) {
      const item = await this.itemRepository.findOne({
        where: { id: updateQuestionDto.itemId, isDeleted: false },
      });
      if (!item) {
        throw new BadRequestException(`El ítem con ID ${updateQuestionDto.itemId} no existe o está eliminado.`);
      }
      question.item = item;
    }

    question.content = updateQuestionDto.content ?? question.content;
    return this.questionRepository.save(question);
  }

  async remove(id: number): Promise<void> {
    const question = await this.findOne(id);
    await this.questionRepository.remove(question);
  }
}
