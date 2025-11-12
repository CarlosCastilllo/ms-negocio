import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Guide from 'App/Models/Guide'
import TouristActivity from 'App/Models/TouristActivity'

export default class GuideByTouristActivity extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public guide_id: number

  @column()
  public tourist_activity_id: number

  @column()
  public price?: number

  @column()
  public seats?: number

  @column()
  public notes?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

   // Relaciones
  @belongsTo(() => Guide, { foreignKey: 'guide_id' })
  public guide: BelongsTo<typeof Guide>

  @belongsTo(() => TouristActivity, { foreignKey: 'tourist_activity_id' })
  public touristActivity: BelongsTo<typeof TouristActivity>
}
