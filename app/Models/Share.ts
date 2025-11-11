import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Share extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cantity: number

  @column()
  public price: number

  @column()
  public travel_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
