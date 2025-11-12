import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get(
    "/guidebytouristactivity",
    "GuideByTouristActivitiesController.find",
  );
  Route.get(
    "/guidebytouristactivity/:id",
    "GuideByTouristActivitiesController.find",
  );
  Route.post(
    "/guidebytouristactivity",
    "GuideByTouristActivitiesController.create",
  );
  Route.put(
    "/guidebytouristactivity/:id",
    "GuideByTouristActivitiesController.update",
  );
  Route.delete(
    "/guidebytouristactivity/:id",
    "GuideByTouristActivitiesController.delete",
  );
}).middleware(["security"]);
