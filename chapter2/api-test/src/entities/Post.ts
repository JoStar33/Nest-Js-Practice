import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('post', { schema: 'sleact' })
export class Post {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', length: 20 })
  title: string;

  @Column('varchar', { name: 'description', nullable: true, length: 100 })
  description: string | null;

  @Column('varchar', { name: 'author', nullable: true, length: 100 })
  author: string | null;

  //사용자로 조인!
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  user: User;
}
