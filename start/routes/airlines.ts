import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/airline", "AirlinesController.find");
  Route.get("/airline/:id", "AirlinesController.find");
  Route.post("/airline", "AirlinesController.create");
  Route.put("/airline/:id", "AirlinesController.update");
  Route.delete("/airline/:id", "AirlinesController.delete");
}).middleware(["security"]);
