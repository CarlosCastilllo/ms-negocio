import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Airline from './Airline'
import Vehicle from './Vehicle'

export default class Aircraft extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public model: string

  @column()
  public capacity: number

  @column()
  public airline_id: number

  @column()
  public vehicle_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Airline, {
    foreignKey: 'airline_id', // Foreign key on the Airline model
  })
  public airline: BelongsTo<typeof Airline>

  @belongsTo(() => Vehicle, {
    foreignKey: 'vehicle_id', // Foreign key on the Vehicle model
  })
  public vehicle: BelongsTo<typeof Vehicle>
}
