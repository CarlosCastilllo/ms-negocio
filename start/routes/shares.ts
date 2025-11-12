import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/share", "SharesController.find");
  Route.get("/share/:id", "SharesController.find");
  Route.post("/share", "SharesController.create");
  Route.put("/share/:id", "SharesController.update");
  Route.delete("/share/:id", "SharesController.delete");
}).middleware(["security"]);
