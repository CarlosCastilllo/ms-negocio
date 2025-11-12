import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Journey from './Journey'
import Travel from './Travel'
import TransportService from './TransportService'

export default class Itinerary extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public order: number

  @column()
  public travel_id: number

  @column()
  public journey_id: number

  @column()
  public transport_service_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @belongsTo(() => Journey, {
    foreignKey: 'journey_id', // Foreign key on the Projector model
  })
  public journey: BelongsTo<typeof Journey>

  @belongsTo(() => Travel, {
    foreignKey: 'travel_id', // Foreign key on the Travel model
  })
  public travel: BelongsTo<typeof Travel>

  @belongsTo(() => TransportService, {
    foreignKey: 'transport_service_id', // Foreign key on the TransportService model
  })
  public transportService: BelongsTo<typeof TransportService>

}