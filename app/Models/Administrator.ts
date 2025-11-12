import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hotel from './Hotel'

export default class Administrator extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number // Relación con el microservicio de seguridad

  @column()
  public type: string // Tipo de administrador (ej: 'general', 'regional', etc.)

  @column()
  public phone: string // Teléfono del administrador

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Hotel, {
    foreignKey: 'hotel_id', // Foreign key on the Seat model
  })
  public hotel: HasMany<typeof Hotel>
  

}
