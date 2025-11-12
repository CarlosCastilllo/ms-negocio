import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class VehicleValidator {
  public schema = schema.create({
    plate: schema.string({}, [
      rules.trim(),
      rules.minLength(5),
      rules.maxLength(10),
      rules.regex(/^[A-Z0-9-]+$/), // solo letras mayúsculas, números y guiones
    ]),

    color: schema.string({}, [
      rules.trim(),
      rules.alpha({ allow: ['space'] }), // solo letras y espacios
      rules.maxLength(20),
    ]),
  })

  public messages = {
    'plate.required': 'La placa del vehículo es obligatoria.',
    'plate.minLength': 'La placa debe tener al menos 5 caracteres.',
    'plate.maxLength': 'La placa no puede tener más de 10 caracteres.',
    'plate.regex': 'La placa solo puede contener letras mayúsculas, números y guiones.',
    'color.required': 'El color del vehículo es obligatorio.',
    'color.alpha': 'El color solo puede contener letras y espacios.',
    'color.maxLength': 'El color no puede tener más de 20 caracteres.',
  }
}
