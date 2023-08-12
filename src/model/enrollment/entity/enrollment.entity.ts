import { Soldier } from "src/model/soldier/entity/soldier.entity";
import { Unit } from "src/model/unit/entity/unit.entity";
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

  @Column({nullable: true})
  street_status: string

  @Column({ nullable: true })
  unit_job: string;

  @Column({ nullable: true })
  join_camp_date: Date;

  @Column({ nullable: true })
  unit_side_job: string;

  @ManyToOne(() => Unit, unit => unit.enrollments)
  @JoinColumn({ name: 'unit_code' })
  unit: Unit;

  @ManyToOne(() => Soldier, soldier => soldier.enrollment)
  @JoinColumn({ name: 'id' })
  soldier: Soldier;
}