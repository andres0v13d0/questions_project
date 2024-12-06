import { Module } from '@nestjs/common';
import { ProjectsModule } from './modules/projects/projects.module';
import { ItemsModule } from './modules/items/items.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswersModule } from './modules/answers/answers.module';
import { ProjectMembersModule } from './modules/project_members/project_members.module'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'b5zu7rynimszqg4ldr5j-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'uaoqxkhzzbepcxoo', 
      password: 'hXzNsBysfewcg7CUv1qI', 
      database: 'b5zu7rynimszqg4ldr5j', 
      autoLoadEntities: true,
      synchronize: true, // Cambia a false en producción
    }),
    ProjectsModule,
    ItemsModule,
    QuestionsModule,
    AnswersModule,
    ProjectMembersModule
  ],
})
export class AppModule {}
