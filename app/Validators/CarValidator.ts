import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CarValidator {
  public schema = schema.create({
    license_plate: schema.string({}, [
      rules.trim(),
      rules.maxLength(10),
      rules.unique({ table: 'cars', column: 'license_plate' }),
    ]),

    brand: schema.string({}, [
      rules.trim(),
      rules.maxLength(50),
    ]),

    model: schema.string({}, [
      rules.trim(),
      rules.maxLength(50),
    ]),

    color: schema.string({}, [
      rules.trim(),
      rules.maxLength(30),
    ]),

    hotel_id: schema.number([
      rules.exists({ table: 'hotels', column: 'id' }),
    ]),

    vehicle_id: schema.number([
      rules.exists({ table: 'vehicles', column: 'id' }),
    ]),
  })

  public messages = {
    'license_plate.required': 'The license plate is required.',
    'license_plate.unique': 'This license plate is already registered.',
    'license_plate.maxLength': 'The license plate cannot exceed 10 characters.',

    'brand.required': 'The brand is required.',
    'brand.maxLength': 'The brand cannot exceed 50 characters.',

    'model.required': 'The model is required.',
    'model.maxLength': 'The model cannot exceed 50 characters.',

    'color.required': 'The color is required.',
    'color.maxLength': 'The color cannot exceed 30 characters.',

    'hotel_id.required': 'The hotel is required.',
    'hotel_id.exists': 'The selected hotel does not exist.',

    'vehicle_id.required': 'The vehicle is required.',
    'vehicle_id.exists': 'The selected vehicle does not exist.',
  }
}
