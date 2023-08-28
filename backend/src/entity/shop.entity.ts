import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  shop_name!: string;

  @Column({ nullable: false })
  latitude!: string;

  @Column({ nullable: false })
  longitude!: string;

  @Column({ default: false })
  status!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
