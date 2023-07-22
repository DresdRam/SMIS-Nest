import { Soldier } from "src/soldier/soldier.entity";
import { Governorate } from "src/governorate/governorate.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  code: number;

  @ManyToOne(() => Soldier, soldier => soldier.address)
  soldier: Soldier;

  @ManyToOne(() => Governorate, governorate => governorate.addresses)
  governorate: Governorate;
}