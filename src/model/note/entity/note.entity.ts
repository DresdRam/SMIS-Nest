import { Category } from "src/model/category/entity/category.entity";
import { Soldier } from "src/model/soldier/entity/soldier.entity";
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
  @JoinColumn({ name: 'soldier_id' })
  soldier: Soldier;

  @ManyToOne(() => Category, category => category.notes)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}