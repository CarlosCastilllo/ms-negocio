import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/client", "ClientsController.find");
  Route.get("/client/:id", "ClientsController.find");
  Route.post("/client", "ClientsController.create");
  Route.put("/client/:id", "ClientsController.update");
  Route.delete("/client/:id", "ClientsController.delete");
}).middleware(["security"]);
