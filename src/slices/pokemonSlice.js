import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemons: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getPokemonsSuccess: (state, { payload }) => {
      state.pokemons = payload.results;
      state.totalPages = Math.ceil(payload.count / 20);
      state.loading = false;
    },
    getPokemonsError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
});

export const {
  setLoading,
  getPokemonsSuccess,
  getPokemonsError,
  setCurrentPage,
} = pokemonSlice.actions;

export const fetchPokemons = (page) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`
    );
    dispatch(getPokemonsSuccess(response.data));
    dispatch(setCurrentPage(page));
  } catch (error) {
    dispatch(getPokemonsError(error.message));
  }
};

export default pokemonSlice.reducer;
