import { Role } from "src/model/role/entity/role.entity";
import { User } from "src/model/user/entity/user.entity";
import { Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";


@Entity()
export class UserRole {

    @PrimaryColumn({ nullable: false })
    user_id: number;
    
    @PrimaryColumn({ nullable: false })
    role_code: number;

    @OneToOne(() => User, (user) => user.userRole)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToOne(() => Role, (role) => role.userRole)
    @JoinColumn({ name: 'role_code' })
    role: Role;

}