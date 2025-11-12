import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Room from './Room'
import Car from './Car'
import Administrator from './Administrator'
import Municipio from './Municipio'

export default class Hotel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public address: string

  @column()
  public city: string

  @column()
  public phone: string

  @column()
  public administrator_id: number // FK hacia Administrator

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Room, {
    foreignKey: 'hotel_id', 
  })
  public rooms: HasMany<typeof Room>

  @hasMany(() => Car, {
    foreignKey: 'hotel_id',
  })
  public cars: HasMany<typeof Car>

  @belongsTo (() => Administrator, {
    foreignKey: 'administrator_id', // Foreign key on the Administrator model
  })
  public administrator: BelongsTo<typeof Administrator>

  @belongsTo (() => Municipio, {
    foreignKey: 'municipio_id', // Foreign key on the Municipio model
  })
  public municipio: BelongsTo<typeof Municipio>
}
