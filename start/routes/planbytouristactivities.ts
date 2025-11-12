import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/planbytouristactivity", "PlanByTouristActivitiesController.find");
  Route.get(
    "/planbytouristactivity/:id",
    "PlanByTouristActivitiesController.find",
  );
  Route.post(
    "/planbytouristactivity",
    "PlanByTouristActivitiesController.create",
  );
  Route.put(
    "/planbytouristactivity/:id",
    "PlanByTouristActivitiesController.update",
  );
  Route.delete(
    "/planbytouristactivity/:id",
    "PlanByTouristActivitiesController.delete",
  );
}).middleware(["security"]);
