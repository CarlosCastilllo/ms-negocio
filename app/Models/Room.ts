import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import RoomTrip from './RoomTrip'
import Hotel from './Hotel'

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

      @hasMany(() => RoomTrip, {
        foreignKey: 'room_id',
      })
      public roomTrip: HasMany<typeof RoomTrip>

      
      @belongsTo(() => Hotel, {
        foreignKey: 'hotel_id', // Foreign key on the Projector model
      })
      public hotel: BelongsTo<typeof Hotel>
}
