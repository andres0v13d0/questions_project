import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectMember } from './project_member.entity/project_member.entity';
import { CreateProjectMemberDto, UpdateProjectMemberDto } from './project_member.dto/project_member.dto';
import { Project } from '../projects/project.entity/project.entity';

@Injectable()
export class ProjectMembersService {
  constructor(
    @InjectRepository(ProjectMember)
    private readonly projectMemberRepository: Repository<ProjectMember>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectMemberDto: CreateProjectMemberDto): Promise<ProjectMember> {
    const { projectId, memberName } = createProjectMemberDto;

    const project = await this.projectRepository.findOne({ where: { id: projectId, isDeleted: false } });
    if (!project) {
      throw new BadRequestException(`El proyecto con ID ${projectId} no existe o está eliminado.`);
    }

    const projectMember = this.projectMemberRepository.create({ project, memberName });
    return this.projectMemberRepository.save(projectMember);
  }

  async findAll(): Promise<ProjectMember[]> {
    return this.projectMemberRepository.find({
      relations: ['project'],
    });
  }

  async findOne(id: number): Promise<ProjectMember> {
    const projectMember = await this.projectMemberRepository.findOne({
      where: { id },
      relations: ['project'],
    });
    if (!projectMember) {
      throw new NotFoundException(`Miembro con ID ${id} no encontrado.`);
    }
    return projectMember;
  }

  async update(id: number, updateProjectMemberDto: UpdateProjectMemberDto): Promise<ProjectMember> {
    const projectMember = await this.findOne(id);

    if (updateProjectMemberDto.projectId) {
      const project = await this.projectRepository.findOne({
        where: { id: updateProjectMemberDto.projectId, isDeleted: false },
      });
      if (!project) {
        throw new BadRequestException(`El proyecto con ID ${updateProjectMemberDto.projectId} no existe o está eliminado.`);
      }
      projectMember.project = project;
    }

    if (updateProjectMemberDto.memberName) {
      projectMember.memberName = updateProjectMemberDto.memberName;
    }

    return this.projectMemberRepository.save(projectMember);
  }

  async remove(id: number): Promise<void> {
    const projectMember = await this.findOne(id);
    await this.projectMemberRepository.remove(projectMember);
  }
}
