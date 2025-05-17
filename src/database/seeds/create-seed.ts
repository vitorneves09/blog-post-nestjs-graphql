import { DataSource } from 'typeorm';
import { join } from 'path';

const dataSource = new DataSource({
    type: 'sqlite',
    database: join(__dirname, '..', '..', '..', 'database.sqlite'),
    entities: [join(__dirname, '..', '..', '**', '*.entity.{ts,js}')],
    synchronize: false,
});

dataSource.initialize().then(async () => {
    const timestamp = new Date().getTime();
    const seedName = process.argv[2];

    if (!seedName) {
        console.error('Please provide a seed name');
        process.exit(1);
    }

    const seedPath = join(__dirname, `${timestamp}-${seedName}.ts`);
    const seedContent = `import { MigrationInterface, QueryRunner } from "typeorm";

export class ${seedName}${timestamp} implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add your seed data here
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Add your rollback logic here
    }
}
`;

    require('fs').writeFileSync(seedPath, seedContent);
    console.log(`Created seed file: ${seedPath}`);
    process.exit(0);
}); 