import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Author } from "./author.entity";
import { AuthorService } from "./author.service";
import { NotFoundException } from "@nestjs/common";

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly service: AuthorService) { }

  @Query(() => Author)
  async getAuthorById(@Args("id") id: string): Promise<Author> {
    const author = await this.service.findById(id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  @Query(() => [Author])
  async findAllAuthors(): Promise<Author[]> {
    return this.service.findAll();
  }

  @Mutation(() => Author)
  async createAuthor(
    @Args("nome") nome: string,
    @Args("age") age: number,
  ): Promise<Author> {

    return this.service.create({ nome, age });
  }

  @Mutation(() => Author)
  async updateAuthor(
    @Args("id") id: string,
    @Args("nome", { nullable: true }) nome?: string,
    @Args("age", { nullable: true }) age?: number,
  ): Promise<Author> {
    const author = await this.service.update(id, { nome, age });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  @Mutation(() => Boolean)
  async deleteAuthor(@Args("id") id: string): Promise<boolean> {
    const deleted = await this.service.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return true;
  }
}
