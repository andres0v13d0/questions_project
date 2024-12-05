import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Answer } from '../../answers/answer.entity/answer.entity';
import { ProjectMember } from '../../project_members/project_member.entity/project_member.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  coordinator: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  score: number;

  @Column({ type: 'enum', enum: ['APRUEBA', 'NO APRUEBA'], default: 'NO APRUEBA' })
  status: 'APRUEBA' | 'NO APRUEBA';

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @OneToMany(() => Answer, (answer) => answer.project)
  answers: Answer[];

  @OneToMany(() => ProjectMember, (member) => member.project, { cascade: true })
  members: ProjectMember[];
}
