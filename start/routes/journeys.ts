import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/journey", "JourneysController.find");
  Route.get("/journey/:id", "JourneysController.find");
  Route.post("/journey", "JourneysController.create");
  Route.put("/journey/:id", "JourneysController.update");
  Route.delete("/journey/:id", "JourneysController.delete");
}).middleware(["security"]);
