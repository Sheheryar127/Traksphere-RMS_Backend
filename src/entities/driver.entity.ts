import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Route } from "./route.entity";

@Entity()
export class Driver {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    fullName: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ unique: true, nullable: false })
    cnicNumber: string;

    @OneToMany(() => Driver, (driver) => driver.routes)
    routes: Route[];

}
