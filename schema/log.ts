import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("log")
export class sLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @CreateDateColumn()
  log_at!: Date;
}