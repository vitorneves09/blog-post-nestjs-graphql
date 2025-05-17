import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedPosts1709000000003 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO post (id, title, content, published, authorId, createdAt, updatedAt) VALUES
            ('1', 'Primeiro Post', 'Conteúdo do primeiro post', true, '1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            ('2', 'Segundo Post', 'Conteúdo do segundo post', true, '1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            ('3', 'Terceiro Post', 'Conteúdo do terceiro post', false, '2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            ('4', 'Quarto Post', 'Conteúdo do quarto post', true, '3', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            ('5', 'Quinto Post', 'Conteúdo do quinto post', true, '4', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
            ('6', 'Sexto Post', 'Conteúdo do sexto post', false, '5', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM post WHERE id IN ('1', '2', '3', '4', '5', '6')`);
    }
} 