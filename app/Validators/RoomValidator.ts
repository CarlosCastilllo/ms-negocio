import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class RoomValidator {
  public schema = schema.create({
    number: schema.string({ trim: true }, [rules.required(), rules.maxLength(10)]),
    type: schema.string({ trim: true }, [rules.required(), rules.maxLength(50)]),
    price: schema.number([rules.required(), rules.range(0, 10000000)]),
    status: schema.string({ trim: true }, [rules.required(), rules.maxLength(30)]),
    hotel_id: schema.number([rules.required()]),
  })

  public messages = {
    'number.required': 'El número de habitación es obligatorio.',
    'hotel_id.required': 'Debe asociarse a un hotel.',
  }
}
