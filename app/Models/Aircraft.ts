import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
}
