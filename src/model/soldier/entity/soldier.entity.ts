import { Address } from "src/model/address/entity/address.entity";
import { Card } from "src/model/card/entity/card.entity";
import { Confine } from "src/model/confine/entity/confine.entity";
import { Enrollment } from "src/model/enrollment/entity/enrollment.entity";
import { GateLog } from "src/model/gate/entity/gate.entity";
import { Note } from "src/model/note/entity/note.entity";
import { PhoneNumber } from "src/model/phone/entity/phone.entity";
import { Removed } from "src/model/removed/entity/removed.entity";
import { Entity, Column, OneToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Soldier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: true,
    })
    name: string;

    @Column({
        unique: true,
        nullable: true,
    })
    national_id: number;

    @Column({
        nullable: true,
    })
    birth_date: Date;

    @Column({
        nullable: true,
    })
    education: string;

    @Column({
        nullable: true,
    })
    phone_number: string;

    @Column({
        nullable: true,
    })
    qualification: string;

    @Column({
        nullable: true,
    })
    rating: string;

    @Column({
        nullable: true,
    })
    rating_type: string;

    @Column({
        nullable: true,
    })
    rating_status: boolean;

    @Column({
        nullable: true,
    })
    religion: string;

    @Column({
        nullable: false,
    })
    removed: boolean;

    @Column({
        nullable: false,
    })
    enrollment_id: number;

    @Column({
        nullable: false,
    })
    card_id: number;

    @Column({
        nullable: true,
    })
    triple_digit_number: string;

    @Column({
        nullable: true,
    })
    medical_condition: string;

    @Column({
        nullable: true,
    })
    medical_condition_type: string;

    @Column({
        nullable: true,
    })
    job: string;

    @Column({
        nullable: true,
    })
    status: number;

    @OneToMany(() => Address, address => address.soldier)
    address: Address[];

    @OneToOne(() => Enrollment, enrollment => enrollment.soldier)
    @JoinColumn({ name: 'enrollment_id' })
    enrollment: Enrollment;

    @OneToOne(() => Card, card => card.soldier)
    card: Card;

    @OneToMany(() => Confine, confine => confine.soldier)
    confine: Confine[];

    @OneToMany(() => Note, note => note.soldier)
    notes: Note[];

    @OneToMany(() => Removed, removed => removed.soldier)
    removedHistory: Removed[];

    @OneToMany(() => GateLog, gateLog => gateLog.soldier)
    gateLogs: GateLog[];

    @OneToMany(() => PhoneNumber, phoneNumber => phoneNumber.soldier)
    @JoinColumn({ name: 'code' })
    phoneNumbers: PhoneNumber[];
}