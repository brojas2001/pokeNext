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

  const [pokemones, setPokemones] = useState<any>(undefined);
  const [types, setTypes] = useState<any>(undefined);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/pokemones")
      // offset === 144
      //   `https://pokeapi.co/api/v2/pokemon/?limit=${
      //       limit - 2
      //     }&offset=${offset}`
      // :
      //
      .then((response) => response.json())
      .then((data: pokemonProps) => {
        console.log(data);
        setPokemones(data);
        // setCount((data));
      });
  }, [offset]);

  useEffect(() => {
    fetch("http://localhost:3000/tipos/1")
      .then((response) => response.json())
      .then((data: any) => {
        const requests = data.results.map((result: any) => fetch(result.url));

        Promise.all(requests)
          .then((responses) => {
            return Promise.all(responses.map((res) => res.json()));
          })
          .then((data: any) => {
            setTypes(data);
          });
      });
  }, []);

  console.log({ pokemones });

  // const pokemonesFiltered = []

  const pokemonesFiltered =
    pokemones?.pokemones?.filter((pokemon: any) =>
      pokemon.results[0].name.toLowerCase().includes(searchField.toLowerCase())
    ) ?? [];
  // pokemones?.results?.filter((pokemon: any) =>
  //   pokemon.name.toLowerCase().includes(searchField.toLowerCase())
  // ) ?? [];
  console.log(pokemonesFiltered);

  const buscaTipoEnEspanol = (tipo: detallePokemonProps) => {
    if (!types) return "";
    return types
      .find((type: any) => type.name === tipo)
      .names.find((lang: any) => lang.language.name === "es").name;
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
        handleChange={(e: any) => setSearchField(e.target.value)}
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
      /> */}
    </main>
  );
};

export default App;
