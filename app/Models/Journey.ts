import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Itinerary from './Itinerary'
import TransportService from './TransportService'
import Municipio from './Municipio'

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

      @hasMany(() => Itinerary, {
      foreignKey: 'journey_id', // Foreign key on the Seat model
    })
    public itinerarys: HasMany<typeof Itinerary>

    @hasMany(() => TransportService, {
      foreignKey: 'journey_id', // Foreign key on the Seat model
    })
    public transportservices: HasMany<typeof TransportService>

      @belongsTo(() => Municipio, {
        foreignKey: 'origin_id', // Foreign key on the Projector model
      })
      public origen: BelongsTo<typeof Municipio>

            @belongsTo(() => Municipio, {
        foreignKey: 'destination_id', // Foreign key on the Projector model
      })
      public destino: BelongsTo<typeof Municipio>
}
