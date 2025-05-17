import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Author } from "./author";
import { AuthorService } from "./author.service";
import { AuthorResolver } from "./author.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorService, AuthorResolver],
  exports: [AuthorService],
})
export class AuthorModule { }
