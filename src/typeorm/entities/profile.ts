import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user_profiles' })
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  age: number;
  @Column()
  dob: string;
}
