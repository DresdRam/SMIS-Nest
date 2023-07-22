import { Soldier } from "src/soldier/soldier.entity";
import { Category } from "src/category/category.entity"
import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm"

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  note: string;

  @Column({ type: 'datetime', nullable: true })
  date: Date;

  @ManyToOne(() => Soldier, soldier => soldier.note)
  soldier: Soldier;

  @ManyToOne(() => Category, category => category.notes)
  category: Category;
}