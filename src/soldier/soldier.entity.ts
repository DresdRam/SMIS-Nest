import { Address } from "src/address/address.entity";
import { Card } from "src/card/card.entity";
import { Confine } from "src/confine/confine.entity";
import { Enrollment } from "src/enrollment/enrollment.entity";
import { GateLog } from "src/gate/gate.entity";
import { Note } from "src/note/note.entity";
import { PhoneNumber } from "src/phone/phone.entity";
import { Removed } from "src/removed/removed.entity";
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

    @OneToOne(() => Address, address => address.soldier)
    address: Address;
  
    @OneToOne(() => Enrollment, enrollment => enrollment.soldier)
    enrollment: Enrollment;
  
    @OneToOne(() => Card, card => card.soldier)
    card: Card;
  
    @OneToMany(() => Confine, confine => confine.soldier)
    confine: Confine[];
  
    @OneToMany(() => Note, note => note.soldier)
    note: Note[];
  
    @OneToMany(() => Removed, removed => removed.soldier)
    removedHistory: Removed[];
  
    @OneToMany(() => GateLog, gateLog => gateLog.soldier)
    gateLogs: GateLog[];
  
    @OneToMany(() => PhoneNumber, phoneNumber => phoneNumber.soldier)
    phoneNumbers: PhoneNumber[];
}