import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';

//타입 ORM을 활용한 엔티티생성!!
@Entity('user', { schema: 'sleact' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', length: 20 })
  email: string;

  @Column('varchar', { name: 'nickname', nullable: true, length: 20 })
  nickname: string | null;

  @Column('varchar', { name: 'password', nullable: true, length: 20 })
  password: string | null;
  //@ManyToMany() // 다대다
  //@ManyToOne() //다대일
  //@OneToMany() //일대다
  //@OneToOne() //일대일
  // 사용자는 여러 게시물들을 가질수 있다. 따라서 아래 구조처럼 구성됨.
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
}
// npx typeorm-model-generator -h localhost -d sleact -p 3305  -u root -x [password] -e mysql
// 기존 데이터베이스 기반으로 위와같이 엔티티를 생성해준다.
