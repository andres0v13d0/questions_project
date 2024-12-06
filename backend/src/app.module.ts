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
      host: 'bq9h2o8jtrsklcph5asc-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'u5ftbos5dfnazbw3', 
      password: '6zWVRN9hLXgx4j4Hdm0C', 
      database: 'bq9h2o8jtrsklcph5asc', 
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
