import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AdministratorValidator {
  public schema = schema.create({
    user_id: schema.number([rules.required()]),
    type: schema.string({ trim: true }, [rules.maxLength(50)]),
    phone: schema.string({ trim: true }, [rules.mobile({ locale: ['es-CO'] })]),
  })

  public messages = {
    'user_id.required': 'El ID de usuario es obligatorio.',
    'type.required': 'El tipo de administrador es obligatorio.',
    'phone.mobile': 'El número de teléfono no tiene un formato válido.',
  }   
}
