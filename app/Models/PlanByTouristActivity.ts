import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Plan from 'App/Models/Plan'
import TouristActivity from 'App/Models/TouristActivity'

export default class PlanByTouristActivity extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public plan_id: number

  @column()
  public tourist_activity_id: number

  @column()
  public price: number

  @column()
  public quantity: number

  @column()
  public notes?: string

  // Relaciones
  @belongsTo(() => Plan, { foreignKey: 'plan_id' })
  public plan: BelongsTo<typeof Plan>

  @belongsTo(() => TouristActivity, { foreignKey: 'tourist_activity_id' })
  public touristActivity: BelongsTo<typeof TouristActivity>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
