import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/municipio", "MunicipiosController.find");
  Route.get("/municipio/:id", "MunicipiosController.find");
  Route.post("/municipio", "MunicipiosController.create");
  Route.put("/municipio/:id", "MunicipiosController.update");
  Route.delete("/municipio/:id", "MunicipiosController.delete");
}).middleware(["security"]);
