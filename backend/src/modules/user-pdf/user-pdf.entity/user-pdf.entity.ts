import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/user.entity/user.entity';

@Entity('user_pdfs')
export class UserPDF {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.pdfs, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'bytea' })
  pdf: Buffer;

  @CreateDateColumn({ type: 'timestamp' })
  uploaded_at: Date;
}
