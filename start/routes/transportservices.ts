import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/transportservice", "TransportServicesController.find");
  Route.get("/transportservice/:id", "TransportServicesController.find");
  Route.post("/transportservice", "TransportServicesController.create");
  Route.put("/transportservice/:id", "TransportServicesController.update");
  Route.delete("/transportservice/:id", "TransportServicesController.delete");
}).middleware(["security"]);
