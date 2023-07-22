import { Soldier } from "src/soldier/soldier.entity";
import { Category } from "src/category/category.entity"
import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm"

@Entity()
export class PhoneNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phone_number: string;

  @ManyToOne(() => Soldier, soldier => soldier.phoneNumbers)
  soldier: Soldier;
}