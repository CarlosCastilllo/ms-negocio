import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/plan", "PlansController.find");
  Route.get("/plan/:id", "PlansController.find");
  Route.post("/plan", "PlansController.create");
  Route.put("/plan/:id", "PlansController.update");
  Route.delete("/plan/:id", "PlansController.delete");
}).middleware(["security"]);
