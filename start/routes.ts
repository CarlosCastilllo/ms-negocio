import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

// Importar rutas modulares
import "./routes/administrators"
import "./routes/aircrafts"
import "./routes/airlines"
import "./routes/bankcards"
import "./routes/bills"
import "./routes/cars"
import "./routes/clients"
import "./routes/clienttravels"
import "./routes/gps"
import "./routes/guidebytouristactivities"
import "./routes/guides"
import "./routes/hotels"
import "./routes/itineraries"
import "./routes/journeys"
import "./routes/municipios"
import "./routes/planbytouristactivities"
import "./routes/plans"
import "./routes/plantrips"
import "./routes/rooms"
import "./routes/roomtrips"
import "./routes/shares"
import "./routes/touristactivities"
import "./routes/transportservices"
import "./routes/travels"
import "./routes/users"
import "./routes/vehicles"
