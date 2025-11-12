import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Itinerary from './Itinerary'
import Share from './Share'
import PlanTrip from './PlanTrip'
import RoomTrip from './RoomTrip'
import ClientTravel from './ClientTravel'

export default class Travel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public start_date: DateTime

  @column.dateTime()
  public end_date: DateTime

  @column()
  public price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

      @hasMany(() => Itinerary, {
        foreignKey: 'travel_id',
      })
      public itinerary: HasMany<typeof Itinerary>

    @hasMany(() => Share, {
        foreignKey: 'travel_id',
      })
      public share: HasMany<typeof Share>

    
    @hasMany(() => RoomTrip, {
        foreignKey: 'travel_id',
      })
      public roomTrip: HasMany<typeof RoomTrip>

      
    @hasMany(() => PlanTrip, {
        foreignKey: 'travel_id',
      })
      public planTrip: HasMany<typeof PlanTrip>

          @hasMany(() => ClientTravel, {
        foreignKey: 'travel_id',
      })
      public clientTravel: HasMany<typeof ClientTravel>
}
