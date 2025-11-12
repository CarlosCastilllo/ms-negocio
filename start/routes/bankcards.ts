import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/bankcard", "BankCardsController.find");
  Route.get("/bankcard/:id", "BankCardsController.find");
  Route.post("/bankcard", "BankCardsController.create");
  Route.put("/bankcard/:id", "BankCardsController.update");
  Route.delete("/bankcard/:id", "BankCardsController.delete");
}).middleware(["security"]);
