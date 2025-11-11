import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Bill extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public state: string

  @column()
  public share_id: number

  @column()
  public bank_card_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
