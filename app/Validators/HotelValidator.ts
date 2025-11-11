import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class HotelValidator {
  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.required(), rules.maxLength(100)]),
    address: schema.string({ trim: true }, [rules.required(), rules.maxLength(200)]),
    city: schema.string({ trim: true }, [rules.required(), rules.maxLength(100)]),
    phone: schema.string({ trim: true }, [rules.mobile({ locale: ['es-CO'] })]),
    administrator_id: schema.number([rules.required()]),
  })

  public messages = {
    'name.required': 'El nombre del hotel es obligatorio.',
    'administrator_id.required': 'Debe asociarse a un administrador.',
  }
}
