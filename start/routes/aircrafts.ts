import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/aircraft", "AircraftController.find");
  Route.get("/aircraft/:id", "AircraftController.find");
  Route.post("/aircraft", "AircraftController.create");
  Route.put("/aircraft/:id", "AircraftController.update");
  Route.delete("/aircraft/:id", "AircraftController.delete");
}).middleware(["security"]);
