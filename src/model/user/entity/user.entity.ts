import { UserRole } from "src/model/user_role/entity/user_role.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
    })
    username: string;

    @Column({
        nullable: false,
    })
    password: string;

    @OneToOne(() => UserRole, (userRole) => userRole.user)
    @JoinColumn({ name: 'id' })
    userRole: UserRole;

}