/* eslint-disable implicit-arrow-linebreak */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import servicesReducer from "./reducers/services/ServicesSlice";
import { createAPI } from "../services/api";
import eventReducer from "./reducers/events/EventSlice";

const api = createAPI();

const rootReducer = combineReducers({
  services: servicesReducer,
  event: eventReducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  });
