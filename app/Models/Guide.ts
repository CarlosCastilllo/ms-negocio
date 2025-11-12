import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import GuideByTouristActivitiesController from 'App/Controllers/Http/GuideByTouristActivitiesController'
import GuideByTouristActivity from './GuideByTouristActivity'

export default class Guide extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public lastname: string

  @column()
  public identification: string

  @column()
  public phone: string

  @column()
  public email: string

  @column()
  public userId: number

  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => GuideByTouristActivity, {
      foreignKey: 'guide_id', // Foreign key on the GuideByTouristActivity model
    })
    public guideByTouristActivity : HasMany<typeof GuideByTouristActivity>
}
