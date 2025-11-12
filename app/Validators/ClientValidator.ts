import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ClientValidator {
  public schema = schema.create({
    user_id: schema.number([
      rules.exists({ table: 'users', column: 'id' }), // Asegura que el usuario exista
    ]),

    identification: schema.string({}, [
      rules.trim(),
      rules.minLength(5),
      rules.maxLength(15),
      rules.regex(/^[A-Z0-9-]+$/), // Letras mayúsculas, números o guiones
      rules.unique({ table: 'clients', column: 'identification' }), // No se repita
    ]),

    age: schema.number([
      rules.range(0, 120), // Edad válida
    ]),
  })

  public messages = {
    'user_id.required': 'El campo user_id es obligatorio.',
    'user_id.exists': 'El usuario asociado no existe.',
    'identification.required': 'La identificación es obligatoria.',
    'identification.minLength': 'La identificación debe tener al menos 5 caracteres.',
    'identification.maxLength': 'La identificación no puede tener más de 15 caracteres.',
    'identification.regex': 'La identificación solo puede tener letras mayúsculas, números o guiones.',
    'identification.unique': 'Esta identificación ya está registrada.',
    'age.required': 'La edad es obligatoria.',
    'age.range': 'La edad debe estar entre 0 y 120 años.',
  }
}
