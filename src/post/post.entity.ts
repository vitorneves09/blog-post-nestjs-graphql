import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Author } from "src/author/author.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Post {
    @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

    @Field()
    @Column()
    title: string;

    @Field()
  @Column("text")
  content: string;

    @Field()
    @Column({ default: false })
    published: boolean;

    @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.posts)
  author: Author;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
