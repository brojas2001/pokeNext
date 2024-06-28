import React, { useEffect, useState } from 'react'
import './card.style.css'
// import Button from "@mui/material/Button";
// import Drawer from '@mui/material/Drawer'
// import { colours } from '../../constants'



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

interface detalleEspecieProps {
    flavor_text_entries: {
        flavor_text: string,
        language: {
            name: string,
            url: string
        }
    pokedex_numbers: {
        entry_number: number,
        pokedex: {
            name: string,
            url: string
        }
    }
    }
}


const Card = ({pokemon}) => {
  const [detallePokemon, setDetallePokemon] = useState(undefined)
  const [detalleEspecie, setDetalleEspecie] = useState(undefined)
//   const [open, setOpen] = React.useState(false)

//   const toggleDrawer = (newOpen) => () => {
//     setOpen(newOpen)
//   }
  useEffect(() => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((data: detallePokemonProps) => {
          console.log("detalle pokemon ", data)
          setDetallePokemon(data)
        })
  }, [pokemon.url])

  useEffect(() => {
    if (detallePokemon) {
      fetch(detallePokemon.species)
        .then((response) => response.json())
        .then((data: detalleEspecieProps) => {
          console.log(data)
          setDetalleEspecie(data)
        })
    }
  }, [detallePokemon])

  if (!detallePokemon || !detalleEspecie) {
    return <h1>cargando</h1>
  }
  return (
    <>
      <div className='card-container'>
        </div>
      {/* onClick={toggleDrawer(true)}/> */}
        {/* <img
          className='imagen-pokemon-tarjeta'
          src={
            detallePokemon.sprites.versions['generation-v']['black-white']
              .animated.front_default
          }
          
        />
        <h2 className='nombre-pokemon-tarjeta'>{pokemon.name}</h2>
      </div>

      

      <Drawer open={open} onClose={toggleDrawer(false)} >
        <h1 className='nombre-pokemon-drawer'>{pokemon.name}</h1>
        <img
          src={
            detallePokemon.sprites.versions['generation-v']['black-white']
              .animated.front_default
          }
          className='imagen-pokemon-drawer'
        />
        
        <div className='types-container'>

        {detallePokemon.types.map(type => (
            <p style={{
                backgroundColor: colours[buscaTipoEnEspanol(type.type.name)],
                color: 'white',
                borderRadius: '15px',
                padding: '8px',
                width: 'fit-content'
            }}>
                 {buscaTipoEnEspanol(type.type.name)}
                 </p>
        ))}
        </div>
        
        <p>{detalleEspecie.pokedex_numbers[0].pokedex.name} PokeDex</p>
        <p>{detalleEspecie.genera[5].genus} Categoria</p>
        <p>{detallePokemon.weight}Peso</p>
        <p>{detallePokemon.height}Altura</p> */}
      {/* </Drawer> */}
    </>
  )
}

export default Card 