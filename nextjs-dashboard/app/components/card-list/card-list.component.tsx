import React from 'react'
import './card-list.style.css'
import Card from '../card/card.component'

interface pokemonesProps{
  pokemones:{
    id:number,
    name:string,
    type:string,
    image:string,
    
  }
    
};


interface detallePokemonProps {
  forms:{
      name: string,
      url: string
  }
  types:{
      type: {
          name: string,
          url: string
      }
  },
  species: {
      name: string,
      url: string
  }
  height: number,
  weight: number
};
export default function CardList ({pokemones, buscaTipoEnEspanol}: {pokemones, buscaTipoEnEspanol}) {
// export default function CardList ({pokemones: pokemones }: pokemonesProps) {

  return (
    <div className='card-list'>{
      pokemones.map((pokemon:pokemonesProps) => 
        (<Card 
          key={pokemon.id} 
          pokemon={pokemon}
          buscaTipoEnEspanol={buscaTipoEnEspanol}
          />))
  }
    </div>
  )
}