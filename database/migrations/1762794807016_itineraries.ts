import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'itineraries'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order')
      table.integer('travel_id').unsigned().references('id').inTable('travels').onDelete('CASCADE')
      table.integer('journey_id').unsigned().references('id').inTable('journeys').onDelete('SET NULL')
      table.integer('transport_service_id').unsigned().references('id').inTable('transport_services').onDelete('SET NULL')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
