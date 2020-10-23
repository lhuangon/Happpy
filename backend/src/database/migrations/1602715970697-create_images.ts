import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602715970697 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table ({
      name: 'images',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy:'increment',
        },
        {
          name: 'path',
          type: 'varchar',
        },
        {
          name: 'nursing_id',
          type: 'integer',
        }
      ],
      foreignKeys: [
        {
          name: 'ImageNursing',
          columnNames: ['nursing_id'], //criando um campo nursing_id para guardar o valor do id da tabela nursingHome
          referencedTableName: 'nursingHome', //referenciando qual tabela 
          referencedColumnNames: ['id'], //referenciando qual coluna da tabela nursingHome
          onUpdate: 'CASCADE', //Caso mude o id da tabela nursingHome o id vinculado a imagem tbm muda
          onDelete: 'CASCADE', //Caso delete um nursingHome as imagens vinculadas tbm irei ser deletadas
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }

}
