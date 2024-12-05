import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity/answer.entity';
import { CreateAnswerDto, UpdateAnswerDto } from './answer.dto/answer.dto';
import { Project } from '../projects/project.entity/project.entity';
import { Question } from '../questions/question.entity/question.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const { projectId, questionId, response } = createAnswerDto;

    const project = await this.projectRepository.findOne({ where: { id: projectId, isDeleted: false } });
    if (!project) {
      throw new BadRequestException(`El proyecto con ID ${projectId} no existe o está eliminado.`);
    }

    const question = await this.questionRepository.findOne({ where: { id: questionId } });
    if (!question) {
      throw new BadRequestException(`La pregunta con ID ${questionId} no existe.`);
    }

    const answer = this.answerRepository.create({ project, question, response, isDeleted: false });
    return this.answerRepository.save(answer);
  }

  async findAll(): Promise<Answer[]> {
    return this.answerRepository.find({
      where: { isDeleted: false },
      relations: ['project', 'question'],
    });
  }

  async findOne(id: number): Promise<Answer> {
    const answer = await this.answerRepository.findOne({
      where: { id, isDeleted: false },
      relations: ['project', 'question'],
    });
    if (!answer) {
      throw new NotFoundException(`Respuesta con ID ${id} no encontrada.`);
    }
    return answer;
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    const answer = await this.findOne(id);

    if (updateAnswerDto.projectId) {
      const project = await this.projectRepository.findOne({
        where: { id: updateAnswerDto.projectId, isDeleted: false },
      });
      if (!project) {
        throw new BadRequestException(`El proyecto con ID ${updateAnswerDto.projectId} no existe o está eliminado.`);
      }
      answer.project = project;
    }

    if (updateAnswerDto.questionId) {
      const question = await this.questionRepository.findOne({
        where: { id: updateAnswerDto.questionId },
      });
      if (!question) {
        throw new BadRequestException(`La pregunta con ID ${updateAnswerDto.questionId} no existe.`);
      }
      answer.question = question;
    }

    answer.response = updateAnswerDto.response ?? answer.response;
    return this.answerRepository.save(answer);
  }

  async softDelete(id: number): Promise<Answer> {
    const answer = await this.findOne(id);
    answer.isDeleted = true;
    return this.answerRepository.save(answer);
  }

  async restore(id: number): Promise<Answer> {
    const answer = await this.answerRepository.findOne({ where: { id, isDeleted: true } });
    if (!answer) {
      throw new NotFoundException(`Respuesta con ID ${id} no encontrada o no eliminada.`);
    }
    answer.isDeleted = false;
    return this.answerRepository.save(answer);
  }
}
