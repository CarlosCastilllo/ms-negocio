import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Itinerary extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public order: number

  @column()
  public travel_id: number

  @column()
  public journey_id: number

  @column()
  public transport_service_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
