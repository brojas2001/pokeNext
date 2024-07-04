"use client";
import React, { useState, useEffect } from "react";
import Cardlist from "@/app/components/card-list/card-list.component";
import Paginacion from "@/app/components/paginacion/paginacion";
import Link from "next/link";
import { SearchBox } from "@/app/components/search/search-box.component";

interface detallePokemonProps {
  types: {
    type: {
      name: string;
      url: string;
    };
  };
}
interface pokemonProps {
  count: number;
  results: {
    name: string;
    url: string;
  };
}

interface pokemonTypeProps {
  name: string;
  url: string;
}

interface pokemonDetalleTypeProps {
  name: string;
  names: {
    language: {
      name: string;
    };
  };
}

const App = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(9);
  const [count, setCount] = useState(0);

  const currentPage = offset / limit + 1;
  const pages = Math.floor(count / limit) + 1;

  const [pokemones, setPokemones] = useState(undefined);
  const [types, setTypes] = useState(undefined);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    fetch(
      offset === 144
        ? `https://pokeapi.co/api/v2/pokemon/?limit=${
            limit - 2
          }&offset=${offset}`
        : `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    )
      .then((response) => response.json())
      .then((data: pokemonProps) => {
        setPokemones(data);
        setCount((data.count = 151));
      });
  }, [offset]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type/")
      .then((response) => response.json())
      .then((data: pokemonTypeProps) => {
        const requests = data.results.map((result) => fetch(result.url));

        Promise.all(requests)
          .then((responses) => {
            return Promise.all(responses.map((res) => res.json()));
          })
          .then((data: pokemonDetalleTypeProps) => {
            setTypes(data);
          });
      });
  }, []);

  const pokemonesFiltered =
    pokemones?.results?.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchField.toLowerCase())
    ) ?? [];
  console.log(pokemonesFiltered);

  const buscaTipoEnEspanol = (tipo: detallePokemonProps) => {
    if (!types) return "";
    return types
      .find((type) => type.name === tipo)
      .names.find((lang) => lang.language.name === "es").name;
  };

  return (
    <main className="flex flex-col p-6 items-center bg-white w-full">
      <h1 className="s:text-[40px] text-center font-bold m:text-[40px] text-center font-bold mss:text-[60px] text-center font-bold">
        Pokemones
      </h1>
      <Link
        href="/"
        className="flex items-center gap-5 self-start px-3 py-2 font-medium text-white bg-[#ff793f]  rounded-full capitalize"
      >
        <span className="text-[15px] font-bold">Volver</span>
      </Link>
      <SearchBox
        placeholder="Buscar"
        handleChange={(e) => setSearchField(e.target.value)}
      />

      <Cardlist
        pokemones={pokemonesFiltered}
        buscaTipoEnEspanol={buscaTipoEnEspanol}
      />
      {/* <Paginacion
        pages={pages}
        currentPage={currentPage}
        onChange={(page) => {
          setOffset((page - 1) * limit);
        }}
      ></Paginacion> */}
    </main>
  );
};

export default App;
