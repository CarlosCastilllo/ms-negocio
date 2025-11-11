import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GuideByTouristActivityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    guide_id: schema.number([rules.required()]),
    tourist_activity_id: schema.number([rules.required()]),
    price: schema.number.optional([rules.range(0, 100000000)]),
    seats: schema.number.optional([rules.range(1, 10000)]),
    notes: schema.string.optional({ trim: true }, [rules.maxLength(500)]),
  })

  public messages: CustomMessages = {
    'guide_id.required': 'El campo guide_id es obligatorio.',
    'tourist_activity_id.required': 'El campo tourist_activity_id es obligatorio.',
    'price.range': 'El precio debe estar entre 0 y 100,000,000.',
    'seats.range': 'El número de cupos debe estar entre 1 y 10,000.',
    'notes.maxLength': 'Las notas no pueden superar los 500 caracteres.',
  }
}
