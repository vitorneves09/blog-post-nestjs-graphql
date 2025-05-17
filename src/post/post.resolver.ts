import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Post } from "./post";
import { PostService } from "./post.service";
import { NotFoundException } from "@nestjs/common";

@Resolver(() => Post)
export class PostResolver {
    constructor(private readonly postService: PostService) { }

    @Query(() => [Post])
    async findAllPosts(): Promise<Post[]> {
        return this.postService.findAll();
    }

    @Query(() => Post)
    async findPostById(@Args("id") id: string): Promise<Post> {
        const post = await this.postService.findById(id);
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }

    @Query(() => [Post])
    async findPostsByAuthorId(@Args("authorId") authorId: string): Promise<Post[]> {
        return this.postService.findByAuthorId(authorId);
    }

    @Mutation(() => Post)
    async createPost(
        @Args("title") title: string,
        @Args("content") content: string,
        @Args("published") published: boolean,
        @Args("authorId") authorId: string,
    ): Promise<Post> {
        return this.postService.create({
            title,
            content,
            published,
            author: { id: authorId } as any, // Aqui precisaríamos buscar o autor real do banco
        });
    }

    @Mutation(() => Post)
    async updatePost(
        @Args("id") id: string,
        @Args("title", { nullable: true }) title?: string,
        @Args("content", { nullable: true }) content?: string,
        @Args("published", { nullable: true }) published?: boolean,
    ): Promise<Post> {
        const post = await this.postService.update(id, {
            title,
            content,
            published,
        });
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return post;
    }

    @Mutation(() => Boolean)
    async deletePost(@Args("id") id: string): Promise<boolean> {
        const deleted = await this.postService.delete(id);
        if (!deleted) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return true;
    }
}
