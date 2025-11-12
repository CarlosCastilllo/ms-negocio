import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/bill", "BillsController.find");
  Route.get("/bill/:id", "BillsController.find");
  Route.post("/bill", "BillsController.create");
  Route.put("/bill/:id", "BillsController.update");
  Route.delete("/bill/:id", "BillsController.delete");
}).middleware(["security"]);
