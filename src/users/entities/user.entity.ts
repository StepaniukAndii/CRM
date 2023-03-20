import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseModel } from './base.model.entity';

@Entity()
export class User extends BaseModel {
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: '' })
  jwtToken: string;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({ default: false })
  isVerify: boolean;
}
