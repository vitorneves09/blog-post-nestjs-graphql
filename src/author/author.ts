import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../post/post";

@ObjectType()
@Entity()
export class Author {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  nome: string;

  @Field(() => Int)
  @Column()
  age: number;

  @Field()
  @CreateDateColumn()
  createdDate: Date;

  @Field(() => [Post])
  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}
