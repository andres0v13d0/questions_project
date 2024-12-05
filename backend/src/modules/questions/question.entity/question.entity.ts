import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Item } from '../../items/item.entity/item.entity';
import { Answer } from '../../answers/answer.entity/answer.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Item, (item) => item.questions, { onDelete: 'CASCADE' })
  item: Item;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
