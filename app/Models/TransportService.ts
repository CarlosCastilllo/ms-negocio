import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Vehicle from './Vehicle'
import Journey from './Journey'
import Itinerary from './Itinerary'

export default class TransportService extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public start: DateTime

  @column.dateTime()
  public end: DateTime

  @column()
  public vehicle_id: number

  @column()
  public journey_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

    @belongsTo(() => Vehicle, { foreignKey: 'vehicle_id' })
    public vehicle: BelongsTo<typeof Vehicle>

    @belongsTo(() => Journey, { foreignKey: 'journey_id' })
    public journey: BelongsTo<typeof Journey>

    @hasMany(() => Itinerary, {
      foreignKey: 'transport_service_id',
    })
    public Itinerarys: HasMany<typeof Itinerary>
}
