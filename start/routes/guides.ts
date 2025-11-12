import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/guide", "GuidesController.find");
  Route.get("/guide/:id", "GuidesController.find");
  Route.post("/guide", "GuidesController.create");
  Route.put("/guide/:id", "GuidesController.update");
  Route.delete("/guide/:id", "GuidesController.delete");
}).middleware(["security"]);
