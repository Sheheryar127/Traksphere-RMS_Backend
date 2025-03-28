import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Route } from "./route.entity";

@Entity()
export class BusStop {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    stopName: string;

    @Column({ type: "float", nullable: false })
    latitude: number;

    @Column({ type: "float", nullable: false })
    longitude: number;

    @ManyToMany(() => Route, (route) => route.busStops, { onDelete: 'CASCADE' })
    routes: Route[];
}
