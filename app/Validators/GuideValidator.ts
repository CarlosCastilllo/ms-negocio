import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class GuideValidator {
  public schema = schema.create({
    name: schema.string({ trim: true }, [rules.required()]),
    lastname: schema.string({ trim: true }, [rules.required()]),
    identification: schema.string({ trim: true }, [rules.required(), rules.maxLength(20)]),
    phone: schema.string({ trim: true }, [rules.mobile({ locale: ['es-CO'] })]),
    email: schema.string({ trim: true }, [rules.email()]),
    administrator_id: schema.number([rules.required()]),
  })

  public messages = {
    'name.required': 'El nombre del guía es obligatorio.',
    'email.email': 'El correo electrónico no es válido.',
  }
}
