import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ProjectMembersService } from './project_members.service';
import { CreateProjectMemberDto, UpdateProjectMemberDto } from './project_member.dto/project_member.dto';

@Controller('project-members')
export class ProjectMembersController {
  constructor(private readonly projectMembersService: ProjectMembersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProjectMemberDto: CreateProjectMemberDto) {
    return this.projectMembersService.create(createProjectMemberDto);
  }

  @Get()
  async findAll() {
    return this.projectMembersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.projectMembersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProjectMemberDto: UpdateProjectMemberDto) {
    return this.projectMembersService.update(id, updateProjectMemberDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    await this.projectMembersService.remove(id);
  }
}
