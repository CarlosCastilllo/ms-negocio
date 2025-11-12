import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/clienttravel", "ClientTravelsController.find");
  Route.get("/clienttravel/:id", "ClientTravelsController.find");
  Route.post("/clienttravel", "ClientTravelsController.create");
  Route.put("/clienttravel/:id", "ClientTravelsController.update");
  Route.delete("/clienttravel/:id", "ClientTravelsController.delete");
}).middleware(["security"]);
