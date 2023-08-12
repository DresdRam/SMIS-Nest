import { Address } from "src/model/address/entity/address.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"

@Entity()
export class Governorate {
  @PrimaryGeneratedColumn()
  code: number;

  @Column()
  name: string;

  @OneToMany(() => Address, address => address.governorate)
  addresses: Address[];
}