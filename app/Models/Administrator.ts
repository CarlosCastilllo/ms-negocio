import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
}
