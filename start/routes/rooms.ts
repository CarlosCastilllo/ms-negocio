import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/room", "RoomsController.find");
  Route.get("/room/:id", "RoomsController.find");
  Route.post("/room", "RoomsController.create");
  Route.put("/room/:id", "RoomsController.update");
  Route.delete("/room/:id", "RoomsController.delete");
}).middleware(["security"]);
