import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class BankCard extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public number: string

  @column()
  public expiration: DateTime

  @column()
  public client_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
