import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Governorate } from "src/model/governorate/entity/governorate.entity";
import { Soldier } from "src/model/soldier/entity/soldier.entity";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column({ nullable: true })
  street: string;

  @ManyToOne(() => Soldier, soldier => soldier.address)
  @JoinColumn({ name: 'soldier_id' })
  soldier: Soldier;

  @ManyToOne(() => Governorate, governorate => governorate.addresses)
  @JoinColumn({ name: 'governorate_code' })
  governorate: Governorate;
}