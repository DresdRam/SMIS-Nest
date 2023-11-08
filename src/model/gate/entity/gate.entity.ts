import { Transform } from "class-transformer";
import moment from "moment";
import { Soldier } from "src/model/soldier/entity/soldier.entity";
import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm"

@Entity()
export class GateLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', nullable: true })
  date: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  section: string;

  @Column({ nullable: true })
  overtime: boolean;

  @Column({ nullable: true })
  time_section: string;

  @Column({ nullable: true })
  sub_type: number;

  @Column({ nullable: true })
  service_location: string;

  @ManyToOne(() => Soldier, soldier => soldier.gateLogs)
  @JoinColumn({ name: "soldier_id" })
  soldier: Soldier;
}