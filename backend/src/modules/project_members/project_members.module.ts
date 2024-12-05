import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectMembersService } from './project_members.service';
import { ProjectMembersController } from './project_members.controller';
import { ProjectMember } from './project_member.entity/project_member.entity';
import { Project } from '../projects/project.entity/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectMember, Project])],
  controllers: [ProjectMembersController],
  providers: [ProjectMembersService],
  exports: [ProjectMembersService],
})
export class ProjectMembersModule {}
