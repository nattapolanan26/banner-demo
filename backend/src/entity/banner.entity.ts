import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  file_billboard!: string;

  @Column({ default: false })
  file_billboard_status!: boolean;

  @Column({ nullable: true })
  file_medium_banner!: string;

  @Column({ default: false })
  file_medium_banner_status!: boolean;

  @Column({ nullable: true })
  file_large_rectangle!: string;

  @Column({ default: false })
  file_large_rectangle_status!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
