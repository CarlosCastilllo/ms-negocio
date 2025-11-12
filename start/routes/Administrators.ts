import Route from '@ioc:Adonis/Core/Route'
Route.group(() => {
    Route.get("/administrator", "AdministratorsController.find");
    Route.get("/administrator/:id", "AdministratorsController.find"); 
    Route.post("/administrator", "AdministratorsController.create");
    Route.put("/administrator/:id", "AdministratorsController.update");
    Route.delete("/administrator/:id", "AdministratorsController.delete");
}).middleware(['security'])