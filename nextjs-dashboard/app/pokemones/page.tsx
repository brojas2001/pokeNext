'use client';
import React, { useState, useEffect } from 'react'
import Cardlist from '@/app/components/card-list/card-list.component';
import Paginacion from '@/app/components/paginacion/paginacion';
import Link from 'next/link';
import { SearchBox } from '@/app/components/search/search-box.component'

interface detallePokemonProps {
  types:{
      type: {
          name: string,
          url: string
      }
  },

}
interface pokemonProps {
  count: number;
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
 name: string;
 names: {
  language: {
    name: string;
  }
 }
      }

const App = () => {

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(9);
  const [count, setCount] = useState(0);

  const currentPage = offset / limit +1 
  const pages = Math.floor(count / limit) + 1

  const [pokemones, setPokemones] = useState(undefined)
  const [types, setTypes] = useState(undefined)
  const [searchField, setSearchField] = useState('')


  useEffect(() => {
    fetch(
      offset === 144 ?
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit-2}&offset=${offset}`

       :`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    )
      .then(response => response.json())
      .then((data: pokemonProps) => {
        console.log(data)
        setPokemones(data);
        setCount(data.count=151)
      })
  }, [])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type/')
      .then(response => response.json())
      .then((data: pokemonTypeProps) => {
        const requests = data.results.map(result => fetch(result.url));

        Promise.all(requests)
          .then(responses => {
            return Promise.all(responses.map(res => res.json()));
          })
          .then((data: pokemonDetalleTypeProps) => {
            console.log("types => ", data)
            setTypes(data);
          })
      })
  }, [])

  const pokemonesFiltered = pokemones?.results?.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchField.toLowerCase())
  ) ?? []
  console.log(pokemonesFiltered)

  const buscaTipoEnEspanol = (tipo:detallePokemonProps) => {
    return types.find(type => type.name ===tipo).names.find(lang=> lang.language.name ==="es").name ?? ''
  }
  


  return (
    
    <main className="flex min-h-full flex-col p-6 items-center">
        <h1 className='text-[80px] text-center'>Pokemones</h1>
          <Link
            href="/"
            className="flex items-center gap-5 self-start px-3 py-2 font-medium text-white bg-[#d63031]  rounded-full capitalize"
          >
            <span className='text-[15px] font-bold'>pagina inicio</span> 
          </Link>
        <SearchBox
          placeholder='Buscar'
          handleChange={e => setSearchField(e.target.value)}
        />
        
        <div className='flex'>
          <svg className= 'w-5 flex flex-row left-8 ' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>

        <Cardlist pokemones={pokemonesFiltered} buscaTipoEnEspanol={buscaTipoEnEspanol}/>
        <Paginacion count={pages} page={currentPage} onChange={(e,page) => {setOffset((page-1) * limit)}}></Paginacion>
    </main>
  )
}

export default App