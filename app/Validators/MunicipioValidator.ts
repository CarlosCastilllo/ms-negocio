import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class MunicipioValidator {
  public schema = schema.create({
    name: schema.string({}, [
      rules.minLength(1),
      rules.maxLength(100),
    ]),

    description: schema.string.optional({}, [
      rules.maxLength(255),
    ]),
  })

  public messages = {
    'name.required': 'El nombre del municipio es obligatorio',
    'name.minLength': 'El nombre debe tener al menos 1 caracteres',
    'name.maxLength': 'El nombre no puede superar los 100 caracteres',

    'description.maxLength': 'La descripción no puede superar los 255 caracteres',
  }
}
