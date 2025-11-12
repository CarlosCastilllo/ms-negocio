import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/roomtrip", "RoomTripsController.find");
  Route.get("/roomtrip/:id", "RoomTripsController.find");
  Route.post("/roomtrip", "RoomTripsController.create");
  Route.put("/roomtrip/:id", "RoomTripsController.update");
  Route.delete("/roomtrip/:id", "RoomTripsController.delete");
}).middleware(["security"]);
