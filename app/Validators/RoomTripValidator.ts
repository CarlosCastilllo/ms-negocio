import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoomTripValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    room_id: schema.number([rules.required()]),
    trip_id: schema.number([rules.required()]),
    check_in_date: schema.date.optional({ format: 'yyyy-MM-dd' }),
    check_out_date: schema.date.optional({ format: 'yyyy-MM-dd' }),
    total_price: schema.number.optional([rules.range(0, 100000000)]),
    notes: schema.string.optional({ trim: true }, [rules.maxLength(500)]),
  })

  public messages: CustomMessages = {
    'room_id.required': 'El campo room_id es obligatorio.',
    'trip_id.required': 'El campo trip_id es obligatorio.',
    'check_in_date.date': 'El campo check_in_date debe tener un formato válido (yyyy-MM-dd).',
    'check_out_date.date': 'El campo check_out_date debe tener un formato válido (yyyy-MM-dd).',
    'total_price.range': 'El precio total debe estar entre 0 y 100,000,000.',
    'notes.maxLength': 'Las notas no pueden superar los 500 caracteres.',
  }
}
