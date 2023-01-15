import axios from "axios";
import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../slices/pokemonSlice";
import Loading from "./Loading";
import Paginations from "./Pagination";
import { Modal } from "@mui/material";

export default function PokemonList() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemon.pokemons);
  const currentPage = useSelector((state) => state.pokemon.currentPage);
  const loading = useSelector((state) => state.pokemon.loading);
  const error = useSelector((state) => state.pokemon.error);

  const fetchData = useCallback(() => {
    dispatch(fetchPokemons(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [pokemonInfo, setPokemonInfo] = useState("");
  const [openModal, setModal] = useState(false);
  const handleClose = () => setModal(false);

  const getModalInfo = (url) => {
    setModal(true);
    axios
      .get(url)
      .then((res) => res.data)
      .then((data) => setPokemonInfo(data));
  };

  if (loading) {
    return (
      <div className="load">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="load" style={{ fontSize: "2rem" }}>
        Error: {error}
      </div>
    );
  }

  return (
    <div className="pokemons">
      <h1 style={{ fontSize: "2rem", textAlign: "center", margin: "40px 0" }}>
        Pokemons
      </h1>
      <div className="all-items">
        {pokemons.map((pokemon) => {
          return (
            <div
              key={pokemon.name}
              className="card"
              onClick={() => getModalInfo(pokemon.url)}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.url.split("/")[pokemon.url.split("/").length - 2]
                }.png`}
                alt={pokemon.name}
              />
              <div>{pokemon.name}</div>
            </div>
          );
        })}
      </div>
      <Paginations />
      <div>
        {pokemonInfo && (
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="box-modal">
              <h1 id="modal-modal-title">{pokemonInfo.forms[0].name}</h1>
              <img
                src={pokemonInfo?.sprites?.front_default}
                alt={pokemonInfo?.forms[0]?.name}
              />
              <div className="abilities">
                {pokemonInfo.abilities &&
                  pokemonInfo.abilities.map((ability, key) => (
                    <div
                      key={key}
                      style={{ marginRight: "20px" }}
                      className="ability-bg"
                    >
                      {ability.ability.name}
                    </div>
                  ))}
              </div>
              <div className="stats">
                {pokemonInfo.stats.map((stat, key) => (
                  <span key={key}>
                    {stat.stat.name} : {stat.base_stat}
                  </span>
                ))}
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
