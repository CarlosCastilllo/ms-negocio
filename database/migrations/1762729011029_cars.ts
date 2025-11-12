import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cars'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('license_plate')
      table.string('brand')
      table.string('model')
      table.string('color')
      table.integer('vehicle_id').unsigned().references('id').inTable('vehicles').notNullable()
      table.integer('hotel_id').unsigned().references('id').inTable('hotels').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
