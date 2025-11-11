import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Plan from 'App/Models/Plan'
import Trip from 'App/Models/PlanTrip'

export default class PlanTrip extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public plan_id: number

  @column()
  public travel_id: number

  @column()
  public total_price?: number

  @column()
  public notes?: string

  @belongsTo(() => Plan, { foreignKey: 'plan_id' })
  public plan: BelongsTo<typeof Plan>

  @belongsTo(() => Trip, { foreignKey: 'trip_id' })
  public trip: BelongsTo<typeof Trip>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
