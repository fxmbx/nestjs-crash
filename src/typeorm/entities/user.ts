import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { HashPassword } from 'src/users/utils/password';
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  created_at: Date;

  @BeforeInsert()
  async hashpassword() {
    this.password = await HashPassword(this.password);
  }
}
