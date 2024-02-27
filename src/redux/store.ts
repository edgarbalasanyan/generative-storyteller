import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import collectionsReducer from "./features/collectionsSlice";
import userReducer from "./features/userSlice";
import storiesReducer from "./features/StoriesSlice";
import { serverApi } from "./api/apiSlice/serverApi";

export const store = configureStore({
  reducer: {
    collections: collectionsReducer,
    user: userReducer,
    stories: storiesReducer,
    [serverApi.reducerPath]: serverApi.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(serverApi.middleware),
});

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootType> = useSelector;

