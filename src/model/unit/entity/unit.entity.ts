import { Enrollment } from "src/model/enrollment/entity/enrollment.entity";
import { Entity, Column, JoinColumn, OneToMany, PrimaryColumn } from "typeorm"

@Entity()
export class Unit {
  @PrimaryColumn({ nullable: false })
  code: number;

  @Column()
  name: string;

  @OneToMany(() => Enrollment, enrollment => enrollment.unit)
  enrollments: Enrollment[];
}