import { Soldier } from "src/soldier/soldier.entity";
import { Unit } from "src/unit/unit.entity"
import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm"

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  enrollment_date: Date;

  @Column({ nullable: true })
  agenda_id: number;

  @Column({ nullable: true })
  enrollment_status: string;

  @Column({ nullable: true })
  holiday_group: string;

  @Column({ nullable: true })
  police_number: number;

  @Column({ nullable: true })
  quit_camp_date: Date;

  @Column({ nullable: true })
  unit_enrollment_date: Date;

  @Column({ nullable: true })
  unit_job: string;

  @Column({ nullable: true })
  join_camp_date: Date;

  @Column({ nullable: true })
  unit_side_job: string;

  @ManyToOne(() => Unit, unit => unit.enrollments)
  unit: Unit;

  @ManyToOne(() => Soldier, soldier => soldier.enrollment)
  soldier: Soldier;
}