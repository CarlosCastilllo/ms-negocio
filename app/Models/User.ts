import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number // Id interno (puede ser igual al del microservicio de seguridad)

  @column()
  public remote_id: number // Id real en el microservicio de seguridad

  @column()
  public name: string // (opcional) nombre cacheado

  @column()
  public email: string // (opcional) correo cacheado

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
