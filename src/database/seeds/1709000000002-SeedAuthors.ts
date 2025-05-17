import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedAuthors1709000000002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO author (id, nome, age, createdDate) VALUES
            ('1', 'Vitor Silva', 30, CURRENT_TIMESTAMP),
            ('2', 'Maria Santos', 25, CURRENT_TIMESTAMP),
            ('3', 'João Oliveira', 35, CURRENT_TIMESTAMP),
            ('4', 'Ana Costa', 28, CURRENT_TIMESTAMP),
            ('5', 'Pedro Souza', 32, CURRENT_TIMESTAMP)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM author WHERE id IN ('1', '2', '3', '4', '5')`);
    }
} 