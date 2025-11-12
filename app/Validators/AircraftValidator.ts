import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AircraftValidator {
  public schema = schema.create({
    model: schema.string({}, [
      rules.minLength(2),
      rules.maxLength(100),
    ]),

    capacity: schema.number([
      rules.range(1, 1000), // capacidad mínima 1, máxima 1000 (puedes ajustarlo)
    ]),

    airline_id: schema.number([
      rules.exists({ table: 'airlines', column: 'id' }), // verifica que exista la aerolínea
    ]),

    vehicle_id: schema.number([
      rules.exists({ table: 'vehicles', column: 'id' }), // verifica que exista la aerolínea
    ]),
  })

  public messages = {
    'model.required': 'El modelo del avión es obligatorio',
    'model.minLength': 'El modelo debe tener al menos 2 caracteres',
    'model.maxLength': 'El modelo no puede superar los 100 caracteres',

    'capacity.required': 'La capacidad del avión es obligatoria',
    'capacity.range': 'La capacidad debe estar entre 1 y 1000 pasajeros',

    'airline_id.required': 'Debe especificar una aerolínea válida',
    'airline_id.exists': 'La aerolínea seleccionada no existe',
  }
}
