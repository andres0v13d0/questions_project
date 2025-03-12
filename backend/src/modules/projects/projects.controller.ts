import { Controller, Get, Post, Put, Param, Body, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './project.dto/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Put(':id/soft-delete')
  async softDelete(@Param('id') id: number) {
    return this.projectsService.softDelete(id);
  }

  @Put(':id/restore')
  async restore(@Param('id') id: number) {
    return this.projectsService.restore(id);
  }

  @Get(':projectId/update-score')
  async updateScore(@Param('projectId', ParseIntPipe) projectId: number): Promise<void> {
    await this.projectsService.updateProjectScore(projectId);
  }

}
