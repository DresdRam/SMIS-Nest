import { Enrollment } from "src/model/enrollment/entity/enrollment.entity";
import { Entity, Column, OneToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Officer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    name: string;

    @Column({
        nullable: true,
    })
    phone: string;

    @Column({
        nullable: true,
    })
    rank: string;

}