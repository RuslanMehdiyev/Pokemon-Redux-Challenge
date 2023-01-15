import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import pokemonReducer from "../slices/pokemonSlice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  middleware: [...getDefaultMiddleware(), thunk],
});
