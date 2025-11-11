import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transport_services'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.datetime('start')
      table.datetime('end')
      table.integer('vehicle_id').unsigned().references('id').inTable('vehicles').onDelete('SET NULL')
      table.integer('journey_id').unsigned().references('id').inTable('journeys').onDelete('SET NULL')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
