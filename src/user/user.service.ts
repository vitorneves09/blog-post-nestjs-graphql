import { Injectable } from '@nestjs/common';
import { User } from './user';

@Injectable()
export class UserService {
    private users: User[];

    constructor() {
        this.users = [{id: '1', firstname: 'John', lastname: 'Doe', age: 30, createdDate: new Date()}];
    }

    async findById(id: string): Promise<User | undefined> {
        return await this.users.find(user => user.id === id);
    }

}
