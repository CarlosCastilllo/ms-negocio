import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/car", "CarsController.find");
  Route.get("/car/:id", "CarsController.find");
  Route.post("/car", "CarsController.create");
  Route.put("/car/:id", "CarsController.update");
  Route.delete("/car/:id", "CarsController.delete");
}).middleware(["security"]);
