import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { AppRoute } from "../../const";
import { FirstTaskPage } from "../../pages/FirstTaskPage/FirstTaskPage";
import { SecondTaskPage } from "../../pages/SecondTaskPage/SecondTaskPage";
import { ServicePage } from "../../pages/ServicePage/ServicePage";
import { EventsPage } from "../../pages/EventsPage/EventsPage";
import { EventPage } from "../../pages/EventPage/EventPage";
import { MainPage } from "../../pages/MainPage/MainPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainPage />} />
        <Route path={AppRoute.FirstTask} element={<FirstTaskPage />} />
        <Route path={AppRoute.SecondTask} element={<SecondTaskPage />} />
        <Route
          path={`${AppRoute.SecondTasksService}/:id`}
          element={<ServicePage />}
        />
        <Route path={AppRoute.Calendar} element={<EventsPage />} />
        <Route path={`${AppRoute.Event}/:date`} element={<EventPage />} />
      </Routes>
    </BrowserRouter>
  );
};
