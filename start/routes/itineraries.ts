import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/itinerary", "ItinerariesController.find");
  Route.get("/itinerary/:id", "ItinerariesController.find");
  Route.post("/itinerary", "ItinerariesController.create");
  Route.put("/itinerary/:id", "ItinerariesController.update");
  Route.delete("/itinerary/:id", "ItinerariesController.delete");
}).middleware(["security"]);
