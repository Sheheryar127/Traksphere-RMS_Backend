import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  registrationNumber: string;

  @Column({ nullable: true })
  departmentName: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  routeNumber: string;

  @Column({ nullable: true })
  stopArea: string;

  @Column({ default: false })
  isSuperUser: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
