'use client';
import React, { useState, useEffect } from 'react'
import Cardlist from '@/app/components/card-list/card-list.component';
// import './App.css'
// import { SearchBox } from './app/components/search-box/search-box.component.jsx'
// import Pagination from '@mui/material/Pagination';

interface pokemonProps {
  results:{
    name: string;
    url: string;
  } 
};

interface pokemonTypeProps {
  name: string;
  url: string;
};

interface pokemonDetalleTypeProps {
  damage_relations: {
    double_damage_from:
        {
          name: string;
          url: string;
        }}
      }


const App = () => {
  // const [offset, setOffset] = useState(0);
  // const [limit, setLimit] = useState(9);
  // const [count, setCount] = useState(0);

  // const currentPage = offset / limit +1

  // const pages = Math.floor(count / limit) + 1
  const [pokemones, setPokemones] = useState(undefined)
  const [types, setTypes] = useState(undefined)
  const [searchField, setSearchField] = useState('')

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/`)
      .then(response => response.json())
      .then((data: pokemonProps) => {
        console.log(data)
        setPokemones(data);
        // setCount(data.count)
      })
  }, [])

  // useEffect(() => {
  //   fetch('https://pokeapi.co/api/v2/type/')
  //     .then(response => response.json())
  //     .then((data: pokemonTypeProps) => {
  //       const requests = data.results.map(result => fetch(result.url));

  //       Promise.all(requests)
  //         .then(responses => {
  //           return Promise.all(responses.map(res => res.json()));
  //         })
  //         .then((data: pokemonDetallesTypeProps) => {
  //           setTypes(data);
  //         })
  //     })
  // }, [])

  const pokemonesFiltered = pokemones?.results?.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchField.toLowerCase())
  ) ?? []
  console.log(pokemonesFiltered)

  // const buscaTipoEnEspanol = (tipo) =>types.find(type => type.name ===tipo).names.find(lang=> lang.language.name ==="es").name



  return (
    <div className='App'>
      <h1>Pokemones</h1>
      {/* <h2>{pokemones}</h2> */}
      {/* <SearchBox
        placeholder='search pokemon'
        handleChange={e => setSearchField(e.target.value)}
      /> */}
      <Cardlist pokemones={pokemonesFiltered}/>

      {/* <Pagination count={pages } page={currentPage} onChange={(e,page) => {setOffset((page-1) * limit)}}/> */}
    </div>
  )
}

export default App