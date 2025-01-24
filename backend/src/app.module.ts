import { Module } from '@nestjs/common';
import { ProjectsModule } from './modules/projects/projects.module';
import { ItemsModule } from './modules/items/items.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswersModule } from './modules/answers/answers.module';
import { ProjectMembersModule } from './modules/project_members/project_members.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      
      autoLoadEntities: true,
      synchronize: true, // Cambia a false en producción
      ssl: {
        rejectUnauthorized: false, // Permite conexiones sin verificar el certificado. Cámbialo según las políticas de tu entorno.
      },
    }),
    ProjectsModule,
    ItemsModule,
    QuestionsModule,
    AnswersModule,
    ProjectMembersModule,
  ],
})
export class AppModule {}
