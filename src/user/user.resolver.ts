import { Args, Query, Resolver } from "@nestjs/graphql";
import { User } from "./user";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userServer: UserService) {}

  @Query(() => User)
  async getUserById(@Args("id") id: string): Promise<User | undefined> {
    return this.userServer.findById(id);
  }
}
