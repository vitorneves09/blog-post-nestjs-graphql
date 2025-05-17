import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Author } from "./author";

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly repository: Repository<Author>,
  ) { }

  async findAll(): Promise<Author[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Author | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(data: { nome: string; age: number }): Promise<Author> {
    const author = this.repository.create(data);
    return this.repository.save(author);
  }

  async update(
    id: string,
    data: { nome?: string; age?: number },
  ): Promise<Author | null> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
