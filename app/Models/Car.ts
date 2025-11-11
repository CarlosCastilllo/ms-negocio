import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Car extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public license_plate: string

  @column()
  public brand: string

  @column()
  public model: string

  @column()
  public color: string

  @column()
  public administrator_id: number // FK al administrador

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
