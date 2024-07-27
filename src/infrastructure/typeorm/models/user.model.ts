import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  Index,
} from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity({
  name: 'User',
})
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ where: '"deletedAt" IS NULL', unique: true })
  username: string;

  @Column({
    select: false,
  })
  password?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword?() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }
}
