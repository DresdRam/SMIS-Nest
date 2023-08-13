import { Soldier } from "src/model/soldier/entity/soldier.entity";
import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm"

@Entity()
export class Removed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  reason: string;

  @Column({ type: 'datetime', nullable: true })
  date: Date;

  @Column({ type: 'datetime', nullable: true })
  returned_at: Date;

  @ManyToOne (() => Soldier, soldier => soldier.removedHistory)
  @JoinColumn({ name: 'soldier_id' })
  soldier: Soldier
}