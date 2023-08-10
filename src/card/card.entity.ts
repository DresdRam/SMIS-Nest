import { Soldier } from "src/soldier/soldier.entity";
import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @OneToOne(() => Soldier, soldier => soldier.card)
  @JoinColumn({ name: 'soldier_id' })
  soldier: Soldier;
}