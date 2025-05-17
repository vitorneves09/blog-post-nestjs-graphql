import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./post";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ) { }

    async create(post: Partial<Post>): Promise<Post> {
        const newPost = this.postRepository.create(post);
        return this.postRepository.save(newPost);
    }

    async findAll(): Promise<Post[]> {
        return this.postRepository.find({
            relations: ['author']
        });
    }

    async findById(id: string): Promise<Post | undefined> {
        const post = await this.postRepository.findOne({
            where: { id },
            relations: ['author']
        });
        return post || undefined;
    }

    async findByAuthorId(authorId: string): Promise<Post[]> {
        return this.postRepository.find({
            where: { author: { id: authorId } },
            relations: ['author']
        });
    }

    async update(id: string, post: Partial<Post>): Promise<Post | undefined> {
        await this.postRepository.update(id, post);
        return this.findById(id);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.postRepository.delete(id);
        return (result.affected ?? 0) > 0;
    }
} 