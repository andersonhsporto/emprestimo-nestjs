import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsNotEmpty} from "@nestjs/class-validator";

@Entity()
export class ClientEntity {


    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    id: string;
    @Column()
    @IsNotEmpty()
    name: string;
    @Column()
    @IsNotEmpty()
    cpf: string;
    @Column()
    @IsNotEmpty()
    telephone: string;
    @Column()
    @IsNotEmpty()
    street: string;
    @Column()
    @IsNotEmpty()
    number: string;
    @Column()
    @IsNotEmpty()
    zipCode: string;
    @Column()
    @IsNotEmpty()
    monthIncome: number;

    constructor(name: string, cpf: string, telephone: string, street: string, number: string, zipCode: string, monthIncome: number) {
        this.name = name;
        this.cpf = cpf;
        this.telephone = telephone;
        this.street = street;
        this.number = number;
        this.zipCode = zipCode;
        this.monthIncome = monthIncome;
    }
}
