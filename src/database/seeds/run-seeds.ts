import { DataSource } from 'typeorm';
import { join } from 'path';
import { glob } from 'glob';

const dataSource = new DataSource({
    type: 'sqlite',
    database: join(__dirname, '..', '..', '..', 'database.sqlite'),
    entities: [join(__dirname, '..', '..', '**', '*.entity.{ts,js}')],
    synchronize: false,
});

async function runSeeds() {
    try {
        await dataSource.initialize();
        console.log('Running seeds...');

        // Primeiro, execute as migrations
        console.log('Running migrations...');
        await dataSource.runMigrations();
        console.log('Migrations completed successfully');

        // Depois, execute os seeders em ordem
        const seedFiles = await glob(join(__dirname, '*.ts'));
        const sortedSeedFiles = seedFiles
            .filter(file => !file.includes('create-seed.ts') && !file.includes('run-seeds.ts'))
            .sort(); // Isso vai ordenar os arquivos por nome, que inclui o timestamp

        for (const seedFile of sortedSeedFiles) {
            console.log(`Executing seed: ${seedFile}`);
            const seed = require(seedFile);
            const seedInstance = new seed[Object.keys(seed)[0]]();
            await seedInstance.up(dataSource.createQueryRunner());
            console.log(`Completed seed: ${seedFile}`);
        }

        console.log('Seeds completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error running seeds:', error);
        process.exit(1);
    }
}

runSeeds(); 