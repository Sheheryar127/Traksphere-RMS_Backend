import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable, JoinColumn } from 'typeorm';
import { Driver } from './driver.entity';
import { BusStop } from './stop.entity';

@Entity()
export class Route {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    routeName: string;

    @Column()
    routeNumber: string;

    @Column()
    vehicleNumber: string;


    @ManyToOne(() => Driver, (driver) => driver.routes, { onDelete: 'SET NULL', cascade: true })
    @JoinColumn()
    driver: Driver;

    @ManyToMany(() => BusStop, (busStops) => busStops.routes, { eager: true, cascade: true })
    @JoinTable()

    busStops: BusStop[];


}
