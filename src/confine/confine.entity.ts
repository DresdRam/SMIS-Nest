import { Soldier } from "src/soldier/soldier.entity";
import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm"

@Entity()
export class Confine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imprisoned: boolean;

  @Column()
  start_date: string;

  @Column({ nullable: true })
  end_date: string;

  @Column({ nullable: true })
  reason: Date;

  @Column({ nullable: true })
  prison_reason: Date;

  @ManyToOne(() => Soldier, soldier => soldier.confine)
  soldier: Soldier;
}