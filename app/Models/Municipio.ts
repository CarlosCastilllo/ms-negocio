import { DateTime } from 'luxon'
import { BaseModel,  column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Journey from './Journey'
import Hotel from './Hotel'
import TouristActivity from './TouristActivity'

export default class Municipio extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string



  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Journey, {
    foreignKey: 'origin_id',
  })
  public origen: HasMany<typeof Journey>

  // Journeys that end in this municipality
  @hasMany(() => Journey, {
    foreignKey: 'destination_id',
  })
  public destino: HasMany<typeof Journey>

    @hasMany(() => Hotel, {
    foreignKey: 'municipio_id',
  })
  public hotels: HasMany<typeof Hotel>

      @hasMany(() => TouristActivity, {
    foreignKey: 'municipio_id',
  })
  public touristActicities: HasMany<typeof TouristActivity>
}
