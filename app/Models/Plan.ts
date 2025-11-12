import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import PlanByTouristActivity from './PlanByTouristActivity'
import PlanTrip from './PlanTrip'

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public price: number

  @column()
  public hotel_id: number

  @column()
  public guide_id: number

  @column()
  public car_id: number

  @column()
  public administrator_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

      @hasMany(() => PlanByTouristActivity, {
      foreignKey: 'plan_id',
    })
    public planByTouristActivities: HasMany<typeof PlanByTouristActivity>

    @hasMany(() => PlanTrip, {
      foreignKey: 'plan_id',
    })
    public planTrips: HasMany<typeof PlanTrip>
}
