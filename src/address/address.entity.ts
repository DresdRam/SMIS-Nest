import { Soldier } from "src/soldier/soldier.entity";
import { Governorate } from "src/governorate/governorate.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"

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
  @JoinColumn({ name: 'soldier_id' })
  soldier: Soldier;

  @ManyToOne(() => Governorate, governorate => governorate.addresses)
  @JoinColumn({ name: 'governorate_code' })
  governorate: Governorate;
}