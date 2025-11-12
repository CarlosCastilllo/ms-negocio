import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'aircraft'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('model')
      table.integer('capacity')
      table.integer('airline_id').unsigned().references('id').inTable('airlines').onDelete('SET NULL')
      table.integer('vehicle_id').unsigned().references('id').inTable('airlines').onDelete('SET NULL')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
