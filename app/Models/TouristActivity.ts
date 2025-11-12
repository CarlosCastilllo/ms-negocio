import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import PlanByTouristActivity from './PlanByTouristActivity'
import GuideByTouristActivity from './GuideByTouristActivity'
import Municipio from './Municipio'

export default class TouristActivity extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string
  
  @column()
  public location: string

  @column()
  public price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

        @hasMany(() => PlanByTouristActivity, {
        foreignKey: 'tourist_activity_id',
      })
      public planByTouristActivity: HasMany<typeof PlanByTouristActivity>

            @hasMany(() => GuideByTouristActivity, {
        foreignKey: 'tourist_activity_id',
      })
      public guideByTouristActivity: HasMany<typeof GuideByTouristActivity>

      @belongsTo(() => Municipio, { foreignKey: 'municipio_id' })
      public municipio: BelongsTo<typeof Municipio>
}
