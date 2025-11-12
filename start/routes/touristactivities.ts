import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/touristactivity", "TouristActivitiesController.find");
  Route.get("/touristactivity/:id", "TouristActivitiesController.find");
  Route.post("/touristactivity", "TouristActivitiesController.create");
  Route.put("/touristactivity/:id", "TouristActivitiesController.update");
  Route.delete("/touristactivity/:id", "TouristActivitiesController.delete");
}).middleware(["security"]);
