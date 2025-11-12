import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Travel from './Travel'
import Bill from './Bill'

export default class Share extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cantity: number

  @column()
  public price: number

  @column()
  public travel_id: number

    @belongsTo(() => Travel, { foreignKey: 'travel_id' })
    public travel: BelongsTo<typeof Travel>

    @hasOne(() => Bill, {
    foreignKey: 'share_id', // Foreign key on the Projector model 
  })
  public bill: HasOne<typeof Bill>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
