import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ClientTravel from './ClientTravel'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public identification: string

  @column()
  public age: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => ClientTravel, {
    foreignKey: 'client_id', // Foreign key on the ClientTravel model
  })
  public clientTravels: HasMany<typeof ClientTravel>

}
