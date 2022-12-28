import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HashData } from 'src/users/utils/hash.helper';
import { ProfileEntity } from './profile';
import { PostEntity } from './post';
import { Exclude } from 'class-transformer';
import { UserRolesEnum } from 'src/users/utils/types';
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRolesEnum,
    default: UserRolesEnum.REGULARUSER,
  })
  role: UserRolesEnum;

  @Column({ nullable: true })
  refresh_token: string;

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;

  @OneToMany(() => PostEntity, (post) => post.user)
  @JoinColumn()
  posts: PostEntity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    onUpdate: 'NOW()',
    nullable: true,
  })
  updated_at: Date;

  @BeforeInsert()
  async hashpassword() {
    this.password = await HashData(this.password);
  }
}
