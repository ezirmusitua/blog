import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export abstract class sBase {
  @PrimaryGeneratedColumn()
  id!: number;

  @UpdateDateColumn()
  _updated_at!: Date;

  @CreateDateColumn()
  _created_at!: Date;

  @VersionColumn({ default: 0 })
  _version!: number;
}