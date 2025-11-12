import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/plantrip", "PlanTripsController.find");
  Route.get("/plantrip/:id", "PlanTripsController.find");
  Route.post("/plantrip", "PlanTripsController.create");
  Route.put("/plantrip/:id", "PlanTripsController.update");
  Route.delete("/plantrip/:id", "PlanTripsController.delete");
}).middleware(["security"]);
