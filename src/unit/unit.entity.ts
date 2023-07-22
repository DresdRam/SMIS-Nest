import { Enrollment } from "src/enrollment/enrollment.entity";
import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  code: number;

  @Column()
  name: string;

  @OneToMany(() => Enrollment, enrollment => enrollment.unit)
  enrollments: Enrollment[];
}