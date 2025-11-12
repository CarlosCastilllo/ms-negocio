import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/user", "UsersController.find");
  Route.get("/user/:id", "UsersController.find");
  Route.post("/user", "UsersController.create");
  Route.put("/user/:id", "UsersController.update");
  Route.delete("/user/:id", "UsersController.delete");
}).middleware(["security"]);
