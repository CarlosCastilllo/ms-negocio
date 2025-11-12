import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Hotel from './Hotel'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Hotel , {
    foreignKey: 'hotel_id', // Foreign key on the Hotel model
  })
  public hotel: BelongsTo<typeof Hotel>

}
