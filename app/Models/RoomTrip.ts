import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Room from 'App/Models/Room'
import Trip from 'App/Models/Travel'

export default class RoomTrip extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public room_id: number

  @column()
  public travel_id: number

  @column()
  public check_in_date?: Date

  @column()
  public check_out_date?: Date

  @column()
  public total_price?: number

  @column()
  public notes?: string

  @belongsTo(() => Room, { foreignKey: 'room_id' })
  public room: BelongsTo<typeof Room>

  @belongsTo(() => Trip, { foreignKey: 'trip_id' })
  public trip: BelongsTo<typeof Trip>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
