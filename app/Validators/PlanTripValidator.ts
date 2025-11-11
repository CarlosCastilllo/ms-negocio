import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PlanTripValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    plan_id: schema.number([rules.required()]),
    trip_id: schema.number([rules.required()]),
    total_price: schema.number.optional([rules.range(0, 100000000)]),
    notes: schema.string.optional({ trim: true }, [rules.maxLength(500)]),
  })

  public messages: CustomMessages = {
    'plan_id.required': 'El campo plan_id es obligatorio.',
    'trip_id.required': 'El campo trip_id es obligatorio.',
    'total_price.range': 'El precio total debe estar entre 0 y 100,000,000.',
    'notes.maxLength': 'Las notas no pueden superar los 500 caracteres.',
  }
}
