import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/hotel", "HotelsController.find");
  Route.get("/hotel/:id", "HotelsController.find");
  Route.post("/hotel", "HotelsController.create");
  Route.put("/hotel/:id", "HotelsController.update");
  Route.delete("/hotel/:id", "HotelsController.delete");
}).middleware(["security"]);
