import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HashPassword } from 'src/users/utils/password';
import { ProfileEntity } from './profile';
import { PostEntity } from './post';
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

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;

  @OneToMany(() => PostEntity, (post) => post.user)
  @JoinColumn()
  posts: PostEntity[];

  @BeforeInsert()
  async hashpassword() {
    this.password = await HashPassword(this.password);
  }
}
