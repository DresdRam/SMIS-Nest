import { Soldier } from "src/model/soldier/entity/soldier.entity";
import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm"

@Entity()
export class PhoneNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phone_number: string;

  @ManyToOne(() => Soldier, soldier => soldier.phoneNumbers)
  @JoinColumn({ name: 'soldier_id' })
  soldier: Soldier;
}