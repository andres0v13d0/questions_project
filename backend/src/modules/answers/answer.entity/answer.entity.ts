import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from '../../projects/project.entity/project.entity';
import { Question } from '../../questions/question.entity/question.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.answers, { onDelete: 'CASCADE' })
  project: Project;

  @ManyToOne(() => Question, (question) => question.answers, { onDelete: 'CASCADE' })
  question: Question;

  @Column({ type: 'text' })
  response: string;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
