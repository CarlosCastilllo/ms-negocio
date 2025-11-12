import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Travel from './Travel'

export default class ClientTravel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public travel_id: number

  @column()
  public client_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo (() => Client, {
    foreignKey: 'client_id', // Foreign key on the Client model
  })
  public client: BelongsTo<typeof Client>

  @belongsTo (() => Travel, {
    foreignKey: 'travel_id', // Foreign key on the Client model
  })
  public travel: BelongsTo<typeof Travel>
  
}
