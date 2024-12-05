import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto, UpdateProjectDto } from './project.dto/project.dto';
import { Project } from './project.entity/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { score } = createProjectDto;

    if (score < 0) {
      throw new BadRequestException('El puntaje no puede ser negativo.');
    }

    const status = score >= 80 ? 'APRUEBA' : 'NO APRUEBA';
    const project = this.projectRepository.create({
      ...createProjectDto,
      status,
      isDeleted: false,
    });

    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({ where: { isDeleted: false } });
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id, isDeleted: false } });
    if (!project) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado.`);
    }
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const updatedProject = await this.projectRepository.preload({
      id,
      ...updateProjectDto,
      status: updateProjectDto.score >= 80 ? 'APRUEBA' : 'NO APRUEBA',
    });
  
    if (!updatedProject) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado.`);
    }
  
    return this.projectRepository.save(updatedProject);
  }
  
  

  async softDelete(id: number): Promise<Project> {
    const project = await this.findOne(id);
    project.isDeleted = true;
    return this.projectRepository.save(project);
  }

  async restore(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id, isDeleted: true } });
    if (!project) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado o no eliminado.`);
    }
    project.isDeleted = false;
    return this.projectRepository.save(project);
  }
}
