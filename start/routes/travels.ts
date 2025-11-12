import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/travel", "TravelsController.find");
  Route.get("/travel/:id", "TravelsController.find");
  Route.post("/travel", "TravelsController.create");
  Route.put("/travel/:id", "TravelsController.update");
  Route.delete("/travel/:id", "TravelsController.delete");
}).middleware(["security"]);
