import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import BankCard from './BankCard'
import Share from './Share'

export default class Bill extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public state: string

  @column()
  public share_id: number

  @column()
  public bank_card_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo (() => BankCard, {
    foreignKey: 'bank_card_id', // Foreign key on the BankCard model
  })
  public bankCard: BelongsTo<typeof BankCard>

  @belongsTo (() => Share , {
    foreignKey: 'share_id', // Foreign key on the Share model
  })
  public share: BelongsTo<typeof Share>
}
