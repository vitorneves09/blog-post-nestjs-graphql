import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePostsTable1709000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "post",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "title",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "content",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "published",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "authorId",
                        type: "varchar"
                    },
                    {
                        name: "createdAt",
                        type: "datetime",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updatedAt",
                        type: "datetime",
                        default: "CURRENT_TIMESTAMP"
                    }
                ]
            }),
            true
        );

        await queryRunner.createForeignKey(
            "post",
            new TableForeignKey({
                columnNames: ["authorId"],
                referencedColumnNames: ["id"],
                referencedTableName: "author",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("post");
        if (table) {
            const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("authorId") !== -1);
            if (foreignKey) {
                await queryRunner.dropForeignKey("post", foreignKey);
            }
        }
        await queryRunner.dropTable("post");
    }
} 