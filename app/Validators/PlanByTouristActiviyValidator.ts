import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PlanByTouristActivityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    plan_id: schema.number([
      rules.required(),
    ]),

    tourist_activity_id: schema.number([
      rules.required(),
    ]),

    price: schema.number.optional([
      rules.range(0, 100000000),
    ]),

    quantity: schema.number.optional([
      rules.range(1, 10000),
    ]),

    notes: schema.string.optional({ trim: true }, [
      rules.maxLength(500),
    ]),
  })

  public messages: CustomMessages = {
    'plan_id.required': 'El campo plan_id es obligatorio.',
    'tourist_activity_id.required': 'El campo tourist_activity_id es obligatorio.',
    'price.range': 'El precio debe estar entre 0 y 100,000,000.',
    'quantity.range': 'La cantidad debe ser al menos 1 y no mayor a 10,000.',
    'notes.maxLength': 'Las notas no pueden superar los 500 caracteres.',
  }
}
