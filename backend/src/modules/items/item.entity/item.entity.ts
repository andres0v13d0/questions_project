import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from '../../questions/question.entity/question.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @OneToMany(() => Question, (question) => question.item, { cascade: true })
  questions: Question[];
}
