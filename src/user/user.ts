import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field(() => Int)
  age: number;

  @Field()
  createdDate: Date;
}
