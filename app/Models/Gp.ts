import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Gp extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public latitude: number // Latitud de la coordenada GPS

  @column()
  public longitude: number // Longitud de la coordenada GPS

  @column()
  public altitude?: number // Altitud (opcional)

  @column()
  public accuracy?: number // Precisión en metros

  @column.dateTime()
  public timestamp: DateTime // Marca de tiempo de la captura GPS

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
