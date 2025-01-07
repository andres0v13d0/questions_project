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
  
    // Verificar si el proyecto existe y no está eliminado
    const project = await this.projectRepository.findOne({ where: { id: projectId, isDeleted: false } });
    if (!project) {
      throw new BadRequestException(`El proyecto con ID ${projectId} no existe o está eliminado.`);
    }
  
    // Verificar si la pregunta existe
    const question = await this.questionRepository.findOne({ where: { id: questionId } });
    if (!question) {  
      throw new BadRequestException(`La pregunta con ID ${questionId} no existe.`);
    }
  
    // Verificar si ya existe una respuesta para el projectId y questionId
    const existingAnswer = await this.answerRepository.findOne({
      where: { project: { id: projectId }, question: { id: questionId }, isDeleted: false },
    });
  
    let savedAnswer: Answer;
  
    if (!existingAnswer) {
      const newResponseValue = parseFloat(response);
      const answer = this.answerRepository.create({ project, question, response, isDeleted: false });
      savedAnswer = await this.answerRepository.save(answer);
  
      await this.updateScore(projectId, newResponseValue);
    }
  
    return savedAnswer;
  }

  private async updateScore(projectId: number, valueToAdd: number): Promise<void> {
    if (isNaN(valueToAdd)) {
      throw new BadRequestException(`La respuesta no es un número válido: ${valueToAdd}`);
    }
  
    // Incrementar la puntuación
    await this.projectRepository.increment({ id: projectId }, 'score', valueToAdd);
  
    // Llamar a la función para actualizar el estado después de cambiar la puntuación
    await this.updateStatus(projectId);
  }
  
  private async updateStatus(projectId: number): Promise<Project> {
    // Obtener el proyecto actualizado, incluyendo la puntuación
    const updatedProject = await this.projectRepository.findOne({ where: { id: projectId } });
  
    if (!updatedProject) {
      throw new NotFoundException(`Proyecto con ID ${projectId} no encontrado.`);
    }
  
    // Determinar el nuevo estado en función de la puntuación
    updatedProject.status = updatedProject.score >= 80 ? 'APRUEBA' : 'NO APRUEBA';
  
    // Guardar el proyecto actualizado con el nuevo estado
    return this.projectRepository.save(updatedProject);
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
