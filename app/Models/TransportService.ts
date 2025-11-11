import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class TransportService extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public start: DateTime

  @column.dateTime()
  public end: DateTime

  @column()
  public vehicle_id: number

  @column()
  public journey_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
