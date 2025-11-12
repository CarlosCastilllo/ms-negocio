import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CarValidator {
  public schema = schema.create({
    license_plate: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(10),
    ]),
    brand: schema.string({ trim: true }, [rules.required(), rules.maxLength(50)]),
    model: schema.string({ trim: true }, [rules.required(), rules.maxLength(50)]),
    color: schema.string({ trim: true }, [rules.required(), rules.maxLength(30)]),
    
  })

  public messages = {
    'license_plate.required': 'La placa es obligatoria.',
    'administrator_id.required': 'Debe asociarse a un administrador.',
  }
}
