import { DataSource } from 'typeorm';
import { join } from 'path';

export default new DataSource({
    type: 'sqlite',
    database: join(__dirname, '..', '..', 'database.sqlite'),
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    migrations: [
        join(__dirname, '..', 'database', 'migrations', '*.{ts,js}'),
        join(__dirname, '..', 'database', 'seeds', '*.{ts,js}')
    ],
    synchronize: false,
}); 