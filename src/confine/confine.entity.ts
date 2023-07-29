import { Soldier } from "src/soldier/soldier.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"

@Entity()
export class Confine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  imprisoned: boolean;

  @Column({ nullable: false })
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column({ nullable: true })
  reason: string;

  @Column({ nullable: true })
  prison_reason: string;

  @ManyToOne(() => Soldier, soldier => soldier.confine)
  @JoinColumn({ name: 'soldier_id' })
  soldier: Soldier;
}