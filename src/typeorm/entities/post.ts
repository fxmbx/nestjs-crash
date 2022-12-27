import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user';

@Entity({ name: 'user_posts' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  title: string;
  @Column()
  description: string;
  @Column({ default: 'avatar.png' })
  image_url: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;
}
