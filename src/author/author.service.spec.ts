import { Test, TestingModule } from "@nestjs/testing";
import { AuthorService } from "./author.service";

// eslint-disable-next-line prettier/prettier
describe('AuthorService', () => {
  let service: AuthorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorService],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  // it("Should be return all authors",)()=> {

  //   const result: Author[] = [];

  //   result.push();

  //   jest.spyOn(service, 'findAll').mockImplementation(()=> result);

  //   expect(this.service.listAll).toBe();
  // };
});
