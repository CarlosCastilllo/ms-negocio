import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Journey extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public origin: number

  @column()
  public destination: number

  @column()
  public distance: number

  @column()
  public duration: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
