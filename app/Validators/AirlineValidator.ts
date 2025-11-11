import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AirlineValidator {
  public schema = schema.create({
    name: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(50),
    ]),

    accreditation: schema.string({}, [
      rules.minLength(2),
      rules.maxLength(50),
    ]),

    email: schema.string({}, [
      rules.email(),
      rules.maxLength(50),
    ]),
  })

  public messages = {
    'name.required': 'El nombre de la aerolínea es obligatorio',
    'name.minLength': 'El nombre debe tener al menos 3 caracteres',
    'name.maxLength': 'El nombre no puede superar los 100 caracteres',

    'accreditation.required': 'La acreditación es obligatoria',
    'accreditation.minLength': 'La acreditación debe tener al menos 2 caracteres',
    'accreditation.maxLength': 'La acreditación no puede superar los 50 caracteres',

    'email.required': 'El correo electrónico es obligatorio',
    'email.email': 'Debe proporcionar un correo electrónico válido',
    'email.maxLength': 'El correo electrónico no puede superar los 150 caracteres',
  }
}
