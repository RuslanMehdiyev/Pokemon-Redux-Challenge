import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { fetchPokemons } from "../slices/pokemonSlice";

function Paginations() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pokemon.currentPage);
  const totalPages = useSelector((state) => state.pokemon.totalPages);
  const handlePageChange = (event, value) => {
    dispatch(fetchPokemons(value));
  };

  return (
    <>
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            variant="outlined"
            count={Math.ceil(totalPages)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </>
  );
}

export default Paginations;
