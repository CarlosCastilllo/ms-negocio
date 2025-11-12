import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Aircraft from './Aircraft'

export default class Airline extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  
  @column()
  public accreditation: string

  @column()
  public email: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Aircraft, {
      foreignKey: 'aircraft_id', // Foreign key on the Seat model
    })
    public aircraft: HasMany<typeof Aircraft>

}
