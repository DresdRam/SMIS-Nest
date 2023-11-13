import { UserRole } from "src/model/user_role/entity/user_role.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Role {

    constructor (role: string) {
        this.role = role
    }

    @PrimaryColumn({
        nullable: false,
    })
    code: number;

    @Column({
        nullable: false,
    })
    role: string;

    @OneToOne(() => UserRole, (userRole) => userRole.role)
    @JoinColumn({ name: 'code' })
    userRole: UserRole;

}