import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('match')
export class Match extends AbstractEntity<Match> {
  @Column()
  homeTeam: string;

  @Column()
  awayTeam: string;

  @Column({ type: 'date' })
  matchDate: string;

  @Column({ type: 'time' })
  matchTime: string;

  @CreateDateColumn()
  createdAt: Date;
}
