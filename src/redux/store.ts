import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import Auth from "./Auth/AuthSlice";
import Plan from "./Plan/Plan";
import Profile from "./Profile/Profile";
import Users from "./Users/User";
import Apartment from "./Apartment/ApartmentSlice";

export const store = configureStore({
	reducer: {
		[Auth.reducerPath]: Auth.reducer,
		[Plan.reducerPath]: Plan.reducer,
		[Profile.reducerPath]: Profile.reducer,
		[Users.reducerPath]: Users.reducer,
		[Apartment.reducerPath]: Apartment.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Auth.middleware, Plan.middleware, Profile.middleware, Users.middleware, Apartment.middleware),
});

setupListeners(store.dispatch);
