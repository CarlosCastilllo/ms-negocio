import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  hasOne,
  HasOne,
} from "@ioc:Adonis/Lucid/Orm";
import TransportService from "./TransportService";
import Car from "./Car";
import Aircraft from "./Aircraft";
import Gp from "./Gp";

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public plate: string;

  @column()
  public color: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => TransportService, {
    foreignKey: "vehicle_id",
  })
  public transportServices: HasMany<typeof TransportService>;

  @hasOne(() => Car, {
    foreignKey: "vehicle_id", // Foreign key on the Projector model
  })
  public car: HasOne<typeof Car>;

  @hasOne(() => Aircraft, {
    foreignKey: "vehicle_id", // Foreign key on the Projector model
  })
  public aircraft: HasOne<typeof Aircraft>;

  @hasOne(() => Gp, {
    foreignKey: "vehicle_id", // Foreign key on the Projector model
  })
  public gps: HasOne<typeof Gp>;
}
