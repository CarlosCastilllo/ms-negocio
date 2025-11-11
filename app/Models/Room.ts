import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public number: string

  @column()
  public type: string

  @column()
  public price: number

  @column()
  public status: string

  @column()
  public hotel_id: number // FK hacia Hotel

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
